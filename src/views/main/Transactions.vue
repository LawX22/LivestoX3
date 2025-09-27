<template>
  <div class="h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-green-100 flex flex-col relative overflow-hidden">
    <!-- Background Elements -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute top-20 left-10 w-12 h-12 bg-green-300/30 rounded-full blur-sm animate-pulse"></div>
      <div class="absolute bottom-24 right-24 w-16 h-16 bg-teal-300/20 rounded-full blur-sm animate-pulse" style="animation-delay: 1s"></div>
      <div class="absolute top-1/2 right-8 w-6 h-6 bg-green-400/25 rounded-full blur-sm animate-pulse" style="animation-delay: 0.5s"></div>
    </div>

    <!-- NavBar -->
    <div class="sticky top-0 z-50">
      <NavBar />
    </div>

    <!-- Combined Header -->
    <div class="sticky top-0 z-40 px-4 md:px-6 pt-3">
      <div class="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white p-4 rounded-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border border-green-200 shadow-lg backdrop-blur-sm">
        <!-- Left side - Logo and Title -->
        <div class="flex items-center min-w-0">
          <div class="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mr-3 backdrop-blur-sm shadow-lg">
            <svg class="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path v-if="currentView === 'farmer'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <div class="min-w-0">
            <div class="flex items-center gap-2">
              <h1 class="text-xl font-bold text-white truncate">
                {{ currentView === 'farmer' ? 'Transaction History' : 'My Purchases' }}
              </h1>
              <button 
                @click="showInfoModal = true"
                class="p-1 text-white hover:text-white transition-colors duration-200 rounded-full hover:bg-white/20 cursor-pointer"
                title="Learn about transaction views"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </button>
            </div>
            <p class="text-green-100 text-sm opacity-90 truncate">
              {{ currentView === 'farmer' 
                ? 'Manage buyer inquiries and completed sales' 
                : 'Track your livestock orders and purchases' 
              }}
            </p>
          </div>
        </div>

        <!-- Right side - Stats Cards (Compact) -->
        <div class="grid grid-cols-3 gap-2 w-full md:w-auto">
          <div class="bg-white/20 backdrop-blur-sm rounded-md p-1.5 border border-white/20">
            <div class="flex items-center gap-1.5">
              <div class="p-1 rounded-full bg-green-100 text-green-600">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path v-if="currentView === 'farmer'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <div>
                <p class="text-[10px] font-medium text-green-100 leading-tight">
                  {{ currentView === 'farmer' ? 'Total Inquiries' : 'Total Orders' }}
                </p>
                <p class="text-sm font-bold text-white">{{ currentTransactions.length }}</p>
              </div>
            </div>
          </div>

          <div class="bg-white/20 backdrop-blur-sm rounded-md p-1.5 border border-white/20">
            <div class="flex items-center gap-1.5">
              <div class="p-1 rounded-full bg-yellow-100 text-yellow-600">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p class="text-[10px] font-medium text-green-100 leading-tight">Pending</p>
                <p class="text-sm font-bold text-white">{{ pendingCount }}</p>
              </div>
            </div>
          </div>

          <div class="bg-white/20 backdrop-blur-sm rounded-md p-1.5 border border-white/20">
            <div class="flex items-center gap-1.5">
              <div class="p-1 rounded-full bg-blue-100 text-blue-600">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p class="text-[10px] font-medium text-green-100 leading-tight">
                  {{ currentView === 'farmer' ? 'Total Earnings' : 'Total Spent' }}
                </p>
                <p class="text-sm font-bold text-white">₱{{ totalAmount.toLocaleString() }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content Container -->
    <div class="flex flex-1 overflow-hidden">
      <!-- Filters Sidebar Component -->
      <FiltersSidebar
        :is-expanded="isSidebarExpanded"
        :filters="filters"
        :status-options="currentStatusOptions"
        :unique-types="uniqueTypes"
        :unique-sellers="currentView === 'buyer' ? uniqueSellers : []"
        :has-active-filters="hasActiveFilters"
        :is-buyer-view="currentView === 'buyer'"
        @toggle="toggleSidebar"
        @update:filters="updateFilters"
        @reset="resetFilters"
      />

      <!-- Main Content Area -->
      <div class="flex-1 flex flex-col overflow-hidden">
        <!-- View Toggle Tabs (show for farmers, hide for buyers) -->
        <div v-if="userIsFarmer || userIsAdmin" class="sticky top-0 z-30 bg-white/90 backdrop-blur-sm border-b border-white/40 px-4 py-3">
          <div class="flex flex-col sm:flex-row justify-between items-center gap-3">
            <!-- Left spacer for mobile -->
            <div class="hidden sm:block flex-1"></div>
            
            <!-- Center - Tabs -->
            <div class="flex justify-center gap-2">
              <!-- Farmer View Tab -->
              <button 
                @click="currentView = 'farmer'"
                :class="`px-4 py-2 text-sm font-semibold rounded-md transition-all duration-300 flex items-center gap-2 border ${
                  currentView === 'farmer' 
                    ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-md border-green-500' 
                    : 'text-gray-600 hover:text-gray-800 border-gray-200'
                }`"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
                <span class="hidden sm:inline">My Sales</span>
                <span :class="`px-1.5 py-0.5 rounded-full text-xs font-bold ${
                  currentView === 'farmer' ? 'bg-white/20 text-white' : 'bg-green-100 text-green-700'
                }`">{{ farmerTransactions.length }}</span>
              </button>

              <!-- Buyer View Tab -->
              <button 
                @click="currentView = 'buyer'"
                :class="`px-4 py-2 text-sm font-semibold rounded-md transition-all duration-300 flex items-center gap-2 border ${
                  currentView === 'buyer' 
                    ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md border-blue-500' 
                    : 'text-gray-600 hover:text-gray-800 border-gray-200'
                }`"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                <span class="hidden sm:inline">My Purchases</span>
                <span :class="`px-1.5 py-0.5 rounded-full text-xs font-bold ${
                  currentView === 'buyer' ? 'bg-white/20 text-white' : 'bg-blue-100 text-blue-700'
                }`">{{ buyerTransactions.length }}</span>
              </button>
            </div>

            <!-- Right side - Sort By Filter -->
            <div class="flex items-center gap-2 flex-1 justify-end">
              <label class="text-xs font-semibold text-gray-700">Sort By:</label>
              <select v-model="sortBy" class="px-2 py-1 text-xs border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500 rounded-md bg-white shadow-sm">
                <option value="date-desc">Newest</option>
                <option value="date-asc">Oldest</option>
                <option value="price-asc">Price (Low)</option>
                <option value="price-desc">Price (High)</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Results Summary -->
        <div class="sticky top-0 z-20 bg-white/90 backdrop-blur-sm border-b border-white/40 px-4 py-2">
          <div class="flex items-center gap-2">
            <div class="w-7 h-7 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg flex items-center justify-center">
              <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V4z" />
              </svg>
            </div>
            <div>
              <h3 class="text-sm font-bold text-gray-800">
                {{ filteredTransactions.length }} {{ filteredTransactions.length === 1 ? 
                  (currentView === 'farmer' ? 'Transaction' : 'Order') : 
                  (currentView === 'farmer' ? 'Transactions' : 'Orders') 
                }} Found
              </h3>
            </div>
          </div>
        </div>

        <!-- Transactions Table Component -->
        <TransactionsTable
          :transactions="filteredTransactions"
          :is-farmer-view="currentView === 'farmer'"
          @view-details="viewDetails"
          @update-status="updateStatus"
          @cancel-order="cancelOrder"
          @confirm-delivery="confirmDelivery"
          @reset-filters="resetFilters"
        >
          <template #empty-state-actions>
            <button 
              @click="resetFilters" 
              class="px-4 py-2 bg-gradient-to-r from-green-600 via-green-700 to-emerald-700 hover:from-green-700 hover:via-green-800 hover:to-emerald-800 text-white rounded-lg text-xs font-bold transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2 justify-center transform hover:scale-105"
            >
              <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Reset Filters
            </button>
          </template>
        </TransactionsTable>
      </div>
    </div>

    <!-- Transaction Details Modal Component -->
    <TransactionDetailsModal
      :transaction="selectedTransaction"
      :is-farmer-view="currentView === 'farmer'"
      @close="selectedTransaction = null"
      @update-status="updateStatus"
      @cancel-order="cancelOrder"
      @confirm-delivery="confirmDelivery"
    />

    <!-- Info Modal Component -->
    <InfoModal
      :show="showInfoModal"
      :current-user-role="currentUser?.role"
      @close="showInfoModal = false"
    />

    <!-- Enhanced Success Toast -->
    <div v-if="showToast" class="fixed top-4 right-4 z-50">
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
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import NavBar from '@/components/NavBar.vue'
import FiltersSidebar from '@/components/Transactions/FilterSidebar.vue'
import TransactionDetailsModal from '@/components/Transactions/TransactionDetailsModal.vue'
import TransactionsTable from '@/components/Transactions/TransactionsTable.vue'
import InfoModal from '@/components/Transactions/InfoModal.vue'
import type { FarmerTransaction, BuyerTransaction, Transaction, Filters } from '@/services/transactions'
import { auth } from '@/services/auth-service'
import type { User } from '@/services/auth-service'
import { supabase } from '@/supabase'

const router = useRouter()

// User state using auth-service
const currentUser = ref<User | null>(null)
const userIsFarmer = ref(false)
const userIsBuyer = ref(false)
const userIsAdmin = ref(false)

// Reactive state
const currentView = ref<'farmer' | 'buyer'>('buyer')
const isSidebarExpanded = ref(true)
const selectedTransaction = ref<Transaction | null>(null)
const sortBy = ref('date-desc')
const showToast = ref(false)
const toastMessage = ref('')
const showInfoModal = ref(false)

const filters = ref<Filters>({
  search: '',
  statuses: [],
  types: [],
  sellers: [],
  dateFrom: '',
  dateTo: ''
})

// Sample data - both sets are loaded for farmers and admins
const farmerTransactions = ref<FarmerTransaction[]>([])
const buyerTransactions = ref<BuyerTransaction[]>([])

// Load user data using auth-service
const loadUser = async () => {
  try {
    const user = await auth.getCurrentUser()
    currentUser.value = user
    
    if (currentUser.value) {
      // Determine user role and set appropriate flags
      userIsFarmer.value = currentUser.value.role === 'farmer'
      userIsBuyer.value = currentUser.value.role === 'buyer'
      
      // Set initial view based on user role
      if (userIsFarmer.value || userIsAdmin.value) {
        currentView.value = 'farmer' // Farmers and Admins see farmer view by default
      } else {
        currentView.value = 'buyer' // Buyers see buyer view only
      }
      
      console.log(`User detected: ${currentUser.value.email} (${currentUser.value.role})`)
    } else {
      // Fallback if no user is logged in
      console.warn('No user logged in. Defaulting to buyer view.')
      userIsBuyer.value = true
      currentView.value = 'buyer'
    }
  } catch (error) {
    console.error('Error loading user in Transactions:', error)
    currentUser.value = null
    userIsBuyer.value = true
    currentView.value = 'buyer'
  }
}

// Computed properties
const currentTransactions = computed(() => {
  return currentView.value === 'farmer' ? farmerTransactions.value : buyerTransactions.value
})

const currentStatusOptions = computed(() => {
  return currentView.value === 'farmer' 
    ? ['Pending', 'Accepted', 'Rejected', 'Completed']
    : ['Pending', 'Accepted', 'Shipped', 'Completed', 'Cancelled']
})

const pendingCount = computed(() => 
  currentTransactions.value.filter(t => t.status === 'Pending').length
)

const totalAmount = computed(() => {
  if (currentView.value === 'farmer') {
    return farmerTransactions.value
      .filter(t => t.status === 'Completed')
      .reduce((sum, transaction) => sum + transaction.amount, 0)
  } else {
    return buyerTransactions.value
      .filter(t => t.status === 'Completed' || t.status === 'Shipped' || t.status === 'Accepted')
      .reduce((sum, transaction) => sum + transaction.amount, 0)
  }
})

const uniqueTypes = computed(() => {
  return [...new Set(currentTransactions.value.map(t => t.livestock.type))].sort()
})

const uniqueSellers = computed(() => {
  if (currentView.value === 'buyer') {
    return [...new Set(buyerTransactions.value.map(t => t.seller.name))].sort()
  }
  return []
})

const hasActiveFilters = computed(() => {
  return filters.value.search !== '' || 
    filters.value.statuses.length > 0 || 
    filters.value.types.length > 0 ||
    filters.value.sellers.length > 0 ||
    filters.value.dateFrom !== '' ||
    filters.value.dateTo !== ''
})

const filteredTransactions = computed(() => {
  return currentTransactions.value.filter(transaction => {
    const f = filters.value;
    let matchesSearch = !f.search;
    
    if (f.search) {
      const searchTerm = f.search.toLowerCase();
      matchesSearch = 
        transaction.livestock.type.toLowerCase().includes(searchTerm) || 
        transaction.livestock.breed.toLowerCase().includes(searchTerm) || 
        transaction.id.toLowerCase().includes(searchTerm);
      
      if (currentView.value === 'farmer') {
        const farmerTx = transaction as FarmerTransaction;
        matchesSearch = matchesSearch || farmerTx.buyer.name.toLowerCase().includes(searchTerm);
      } else {
        const buyerTx = transaction as BuyerTransaction;
        matchesSearch = matchesSearch || 
          buyerTx.seller.name.toLowerCase().includes(searchTerm) ||
          buyerTx.seller.farm.toLowerCase().includes(searchTerm);
      }
    }
    
    const matchesStatus = f.statuses.length === 0 || f.statuses.includes(transaction.status);
    const matchesType = f.types.length === 0 || f.types.includes(transaction.livestock.type);
    
    let matchesSeller = true;
    if (currentView.value === 'buyer' && f.sellers.length > 0) {
      const buyerTx = transaction as BuyerTransaction;
      matchesSeller = f.sellers.includes(buyerTx.seller.name);
    }
    
    // Date filtering
    let matchesDate = true;
    if (f.dateFrom || f.dateTo) {
      const transactionDate = new Date(transaction.date);
      const fromDate = f.dateFrom ? new Date(f.dateFrom) : null;
      const toDate = f.dateTo ? new Date(f.dateTo) : null;
      
      if (fromDate && transactionDate < fromDate) matchesDate = false;
      if (toDate && transactionDate > toDate) matchesDate = false;
    }
    
    return matchesSearch && matchesStatus && matchesType && matchesSeller && matchesDate;
  }).sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    
    switch (sortBy.value) {
      case 'date-desc': return dateB - dateA;
      case 'date-asc': return dateA - dateB;
      case 'price-asc': return a.amount - b.amount;
      case 'price-desc': return b.amount - a.amount;
      default: return dateB - dateA;
    }
  });
})

// Methods
const toggleSidebar = () => {
  isSidebarExpanded.value = !isSidebarExpanded.value
}

const updateFilters = (newFilters: Filters) => {
  filters.value = newFilters
}

const resetFilters = () => {
  filters.value = {
    search: '',
    statuses: [],
    types: [],
    sellers: [],
    dateFrom: '',
    dateTo: ''
  }
  showToastNotification('All filters have been reset')
}

const showToastNotification = (message: string) => {
  toastMessage.value = message
  showToast.value = true
  setTimeout(() => showToast.value = false, 4000)
}

const viewDetails = (transaction: Transaction): void => {
  selectedTransaction.value = transaction
}

const updateStatus = (id: string, status: 'Accepted' | 'Rejected'): void => {
  if (currentView.value === 'farmer') {
    const index = farmerTransactions.value.findIndex(t => t.id === id)
    if (index !== -1) {
      farmerTransactions.value[index].status = status
      if (selectedTransaction.value?.id === id) {
        selectedTransaction.value = null
      }
      showToastNotification(`Transaction ${status.toLowerCase()} successfully!`)
    }
  }
}

const cancelOrder = (id: string): void => {
  if (currentView.value === 'buyer') {
    const index = buyerTransactions.value.findIndex(t => t.id === id)
    if (index !== -1) {
      buyerTransactions.value[index].status = 'Cancelled'
      if (selectedTransaction.value?.id === id) {
        selectedTransaction.value = null
      }
      showToastNotification('Order cancelled successfully!')
    }
  }
}

const confirmDelivery = (id: string): void => {
  if (currentView.value === 'buyer') {
    const index = buyerTransactions.value.findIndex(t => t.id === id)
    if (index !== -1) {
      buyerTransactions.value[index].status = 'Completed'
      if (selectedTransaction.value?.id === id) {
        selectedTransaction.value = null
      }
      showToastNotification('Delivery confirmed successfully!')
    }
  }
}

// Load transaction data
const loadTransactionData = () => {
  // Load farmer transactions (sales) - only for farmers and admins
  if (userIsFarmer.value || userIsAdmin.value) {
    farmerTransactions.value = [
      {
        id: 'TXN-78901',
        livestock: {
          id: 1,
          type: 'Cattle',
          breed: 'Angus',
          description: 'Healthy Angus cattle, vaccinated and dewormed',
          image: 'https://images.unsplash.com/photo-1545468800-85cc9bc6ecf7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
        },
        buyer: {
          id: 101,
          name: 'Juan Dela Cruz',
          contact: '+63 917 123 4567',
          address: '123 Main St, Quezon City',
          avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
        },
        date: new Date(Date.now() - 86400000 * 2).toISOString(),
        status: 'Pending',
        amount: 45000,
        paymentMethod: 'Cash on Delivery',
        deliveryMethod: 'Pickup',
        message: 'I would like to visit your farm to see the cattle before finalizing the purchase.'
      },
      {
        id: 'TXN-78902',
        livestock: {
          id: 2,
          type: 'Goat',
          breed: 'Boer',
          description: 'Premium Boer goats, 1 year old',
          image: 'https://images.unsplash.com/photo-1551986784-294b14e8ee93?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
        },
        buyer: {
          id: 102,
          name: 'Maria Santos',
          contact: '+63 918 765 4321',
          address: '456 Oak St, Cebu City',
          avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
        },
        date: new Date(Date.now() - 86400000 * 5).toISOString(),
        status: 'Completed',
        amount: 15000,
        paymentMethod: 'Bank Transfer',
        deliveryMethod: 'Delivery'
      }
    ]
  }

  // Load buyer transactions (purchases) - all users can have purchases
  buyerTransactions.value = [
    {
      id: 'ORD-45123',
      livestock: {
        id: 3,
        type: 'Pig',
        breed: 'Duroc',
        description: 'High-quality Duroc pigs, 6 months old',
        image: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
      },
      seller: {
        id: 201,
        name: 'Roberto Reyes',
        contact: '+63 917 555 1234',
        avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
        farm: 'Reyes Family Farm',
        address: 'Tarlac, Philippines'
      },
      date: new Date(Date.now() - 86400000 * 1).toISOString(),
      status: 'Shipped',
      amount: 25000,
      paymentMethod: 'Cash on Delivery',
      deliveryMethod: 'Delivery',
      message: 'Please handle with care during transport.',
      trackingNumber: 'TRK-789456123',
      estimatedDelivery: new Date(Date.now() + 86400000 * 2).toISOString()
    },
    {
      id: 'ORD-45124',
      livestock: {
        id: 4,
        type: 'Chicken',
        breed: 'Rhode Island Red',
        description: 'Free-range chickens, 4 months old',
        image: 'https://images.unsplash.com/photo-1589923188657-1c6c0d4f1c3f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
      },
      seller: {
        id: 202,
        name: 'Lorna Dimatulac',
        contact: '+63 919 888 7777',
        avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
        farm: 'Dimatulac Poultry Farm',
        address: 'Bulacan, Philippines'
      },
      date: new Date(Date.now() - 86400000 * 7).toISOString(),
      status: 'Completed',
      amount: 8000,
      paymentMethod: 'GCash',
      deliveryMethod: 'Pickup'
    }
  ]

  // If user is only a buyer (not farmer or admin), clear farmer transactions
  if (userIsBuyer.value && !userIsFarmer.value && !userIsAdmin.value) {
    farmerTransactions.value = []
  }
}

// Initialize data and user detection
onMounted(async () => {
  await loadUser()
  loadTransactionData()

  // Listen for auth state changes
  supabase.auth.onAuthStateChange((event, session) => {
    if (event === 'SIGNED_IN' && session) {
      loadUser()
      loadTransactionData()
    } else if (event === 'SIGNED_OUT') {
      currentUser.value = null
      userIsFarmer.value = false
      userIsBuyer.value = false
      userIsAdmin.value = false
      currentView.value = 'buyer'
      loadTransactionData()
    }
  })
})

// Watch for user changes to reload transaction data
watch(currentUser, () => {
  loadTransactionData()
})
</script>