<!-- Transactions.vue - WITH SILENT REFRESH (NO LOADING FLICKER) -->
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

    <!-- Header -->
    <div class="sticky top-0 z-40 px-4 md:px-6 pt-3">
      <div class="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white p-4 rounded-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border border-green-200 shadow-lg backdrop-blur-sm">
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
            </div>
            <p class="text-green-100 text-sm opacity-90 truncate">
              {{ currentView === 'farmer' 
                ? 'Manage buyer inquiries and completed sales' 
                : 'Track your livestock orders and purchases' 
              }}
            </p>
          </div>
        </div>

        <!-- View Toggle Buttons - Only show if user is a farmer -->
        <div v-if="userIsFarmer" class="flex gap-2">
          <button 
            @click="currentView = 'farmer'"
            :class="[
              'px-4 py-2 rounded-lg font-medium transition-all cursor-pointer flex items-center gap-2',
              currentView === 'farmer' 
                ? 'bg-white text-green-600 shadow-md' 
                : 'bg-white/20 text-white hover:bg-white/30 border border-white/30'
            ]"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
            </svg>
            <span class="hidden sm:inline">My Sales</span>
            <span :class="[
              'px-1.5 py-0.5 rounded-full text-xs font-bold',
              currentView === 'farmer' ? 'bg-green-100 text-green-700' : 'bg-white/20 text-white'
            ]">{{ farmerTransactions.length }}</span>
          </button>

          <button 
            @click="currentView = 'buyer'"
            :class="[
              'px-4 py-2 rounded-lg font-medium transition-all cursor-pointer flex items-center gap-2',
              currentView === 'buyer' 
                ? 'bg-white text-green-600 shadow-md' 
                : 'bg-white/20 text-white hover:bg-white/30 border border-white/30'
            ]"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <span class="hidden sm:inline">My Purchases</span>
            <span :class="[
              'px-1.5 py-0.5 rounded-full text-xs font-bold',
              currentView === 'buyer' ? 'bg-green-100 text-green-700' : 'bg-white/20 text-white'
            ]">{{ buyerTransactions.length }}</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Loading State (ONLY on initial load) -->
    <div v-if="isInitialLoad" class="flex-1 flex items-center justify-center">
      <div class="text-center">
        <div class="inline-block w-16 h-16 border-4 border-green-600 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p class="text-lg font-semibold text-gray-700">Loading transactions...</p>
      </div>
    </div>

    <!-- Main Content Container -->
    <div v-else class="flex flex-1 overflow-hidden mt-4 gap-4 px-4 md:px-6">
      <FiltersSidebar
        :is-expanded="isSidebarExpanded"
        :filters="filters"
        :status-options="currentStatusOptions"
        :unique-types="uniqueTypes"
        :unique-farmers="currentView === 'buyer' ? uniqueFarmers : []"
        :has-active-filters="hasActiveFilters"
        :is-buyer-view="currentView === 'buyer'"
        @toggle="toggleSidebar"
        @update:filters="updateFilters"
        @reset="resetFilters"
      />

      <div class="flex-1 flex flex-col overflow-hidden">
        <!-- Status Tabs -->
        <div class="sticky top-0 z-30 bg-white/80 backdrop-blur-sm border-b border-green-100 rounded-t-xl">
          <div class="px-4 md:px-6">
            <div class="flex overflow-x-auto hide-scrollbar">
              <button
                v-for="tab in statusTabs"
                :key="tab.status"
                @click="selectStatusTab(tab.status)"
                :class="[
                  'px-6 py-4 text-sm font-medium whitespace-nowrap transition-all border-b-2 cursor-pointer',
                  selectedStatusTab === tab.status
                    ? 'text-green-600 border-green-600'
                    : 'text-gray-600 border-transparent hover:text-gray-900'
                ]"
              >
                {{ tab.label }}
                <span v-if="tab.count > 0" class="ml-2 px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs font-bold">
                  {{ tab.count }}
                </span>
              </button>
            </div>
          </div>
        </div>

        <!-- Sort & Results Bar -->
        <div class="sticky top-0 z-20 bg-white/90 backdrop-blur-sm border-b border-white/40 px-4 py-3">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <div class="w-7 h-7 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg flex items-center justify-center">
                <svg class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V4z" />
                </svg>
              </div>
              <h3 class="text-sm font-bold text-gray-800">
                {{ filteredTransactions.length }} {{ filteredTransactions.length === 1 ? 
                  (currentView === 'farmer' ? 'Transaction' : 'Order') : 
                  (currentView === 'farmer' ? 'Transactions' : 'Orders') 
                }} Found
              </h3>
            </div>

            <div class="flex items-center gap-3">
              <button
                @click="toggleSidebar"
                class="lg:hidden px-3 py-2 bg-white border border-green-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-green-50 cursor-pointer shadow-sm flex items-center gap-2"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                <span class="hidden sm:inline">Filters</span>
              </button>
              <select v-model="sortBy" class="px-3 py-2 bg-white border border-green-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 cursor-pointer shadow-sm">
                <option value="date-desc">Latest</option>
                <option value="date-asc">Oldest</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="price-asc">Price: Low to High</option>
              </select>
            </div>
          </div>
        </div>

        <TransactionsTable
          :transactions="filteredTransactions"
          :is-farmer-view="currentView === 'farmer'"
          @view-details="viewDetails"
          @update-status="updateStatus"
          @cancel-order="cancelOrder"
          @confirm-delivery="confirmDelivery"
          @mark-as-shipped="markAsShipped"
          @mark-ready-pickup="markReadyForPickup"
          @confirm-pickup="confirmPickup"
          @contact-person="contactPerson"
          @create-receipt="openCreateReceiptModal"
          @view-receipt="openViewReceiptModal"
          @request-receipt="requestReceipt"
          @reset-filters="resetFilters"
        />
      </div>

      <!-- Sales Performance Sidebar -->
      <div class="hidden xl:block">
        <SalesPerformanceSidebar
          :transactions="currentTransactions"
          :is-farmer-view="currentView === 'farmer'"
          @view-full="showPerformanceModal = true"
        />
      </div>
    </div>

    <TransactionDetailsModal
      :transaction="selectedTransaction"
      :is-farmer-view="currentView === 'farmer'"
      @close="selectedTransaction = null"
      @update-status="updateStatus"
      @cancel-order="cancelOrder"
      @confirm-delivery="confirmDelivery"
      @mark-as-shipped="markAsShipped"
      @mark-ready-pickup="markReadyForPickup"
      @confirm-pickup="confirmPickup"
    />

    <ReceiptModal
      :show-modal="showCreateReceiptModal || showViewReceiptModal"
      :mode="showCreateReceiptModal ? 'create' : 'view'"
      :receipt-form="receiptForm"
      :transaction="selectedReceiptTransaction"
      @close="closeReceiptModals"
      @save="saveReceipt"
      @download="downloadReceipt"
      @print="printReceipt"
    />

    <!-- Sales Performance Modal -->
    <SalesPerformanceModal
      :show="showPerformanceModal"
      :transactions="currentTransactions"
      :is-farmer-view="currentView === 'farmer'"
      @close="showPerformanceModal = false"
    />

    <!-- Enhanced Success Toast -->
    <div v-if="showToast" class="fixed top-4 right-4 z-50">
      <div class="max-w-sm w-full bg-white/95 backdrop-blur-lg rounded-xl shadow-2xl border border-green-200/60 p-3 transform transition-all duration-300 ease-in-out">
        <div class="flex items-start">
          <div class="flex-shrink-0">
            <div :class="[
              'w-8 h-8 rounded-xl flex items-center justify-center shadow-lg',
              toastType === 'success' ? 'bg-gradient-to-br from-green-400 to-emerald-500' : 'bg-gradient-to-br from-red-400 to-red-500'
            ]">
              <svg v-if="toastType === 'success'" class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
              <svg v-else class="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
              </svg>
            </div>
          </div>
          <div class="ml-3 flex-1">
            <h4 class="text-xs font-bold text-gray-900 mb-0.5">{{ toastType === 'success' ? 'Success!' : 'Error!' }}</h4>
            <div class="text-xs text-gray-700 font-medium">{{ toastMessage }}</div>
          </div>
          <button @click="showToast = false" class="ml-3 flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors duration-200 p-0.5 hover:bg-gray-100 rounded-md cursor-pointer">
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
import { ref, computed, onMounted, watch, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '@/supabase'
import NavBar from '@/components/NavBar.vue'
import FiltersSidebar from '@/components/Transactions/FilterSidebar.vue'
import TransactionDetailsModal from '@/components/Transactions/TransactionDetailsModal.vue'
import TransactionsTable from '@/components/Transactions/TransactionsTable.vue'
import ReceiptModal from '@/components/Transactions/ReceiptModal.vue'
import SalesPerformanceSidebar from '@/components/Transactions/SalesPerformanceSidebar.vue'
import SalesPerformanceModal from '../../components/Transactions/SalesPerformanceModal.vue'
import { transactionService } from '../../services/transactionsService'
import type { 
  Transaction, 
  FarmerTransaction, 
  BuyerTransaction,
  TransactionFilters,
  ReceiptForm
} from '@/types/transactionTypes'

// ==================== STATE & SETUP ====================

const router = useRouter()

const currentUser = ref({
  isAuthenticated: false,
  role: 'buyer',
  id: '',
  email: '',
  name: ''
})

const userIsFarmer = computed(() => currentUser.value.role === 'Farmer')
const userIsBuyer = computed(() => currentUser.value.role === 'Buyer' || currentUser.value.role === 'User')

const currentView = ref<'farmer' | 'buyer'>('buyer')
const isSidebarExpanded = ref(true)
const selectedTransaction = ref<Transaction | null>(null)
const sortBy = ref('date-desc')
const showToast = ref(false)
const toastMessage = ref('')
const toastType = ref<'success' | 'error'>('success')
const selectedStatusTab = ref<string>('all')

// 🆕 Single initial load flag
const isInitialLoad = ref(true)

// 🆕 Visibility tracking
let lastVisibilityTime = Date.now()
const VISIBILITY_REFRESH_THRESHOLD = 30 * 1000

const showPerformanceModal = ref(false)

const filters = ref<TransactionFilters>({
  search: '',
  statuses: [],
  types: [],
  farmers: [],
  dateFrom: '',
  dateTo: ''
})

const farmerTransactions = ref<FarmerTransaction[]>([])
const buyerTransactions = ref<BuyerTransaction[]>([])

// Receipt Modal States
const showCreateReceiptModal = ref(false)
const showViewReceiptModal = ref(false)
const selectedReceiptTransaction = ref<Transaction | null>(null)

const receiptForm = ref<ReceiptForm>({
  receiptNumber: '',
  issueDate: '',
  paymentStatus: 'Paid',
  farmerName: '',
  farmerAddress: '',
  farmerContact: '',
  farmerEmail: '',
  farmerTIN: '',
  buyerName: '',
  buyerAddress: '',
  buyerContact: '',
  buyerEmail: '',
  notes: ''
})

// ==================== COMPUTED PROPERTIES ====================

const currentTransactions = computed(() => {
  return currentView.value === 'farmer' ? farmerTransactions.value : buyerTransactions.value
})

const currentStatusOptions = computed(() => {
  return currentView.value === 'farmer' 
    ? ['Pending', 'Accepted', 'Rejected', 'Completed']
    : ['Pending', 'Accepted', 'Shipped', 'Completed', 'Cancelled']
})

const statusTabs = computed(() => {
  if (currentView.value === 'farmer') {
    return [
      { status: 'all', label: 'All', count: farmerTransactions.value.length },
      { status: 'Pending', label: 'Pending', count: farmerTransactions.value.filter(t => t.status === 'Pending').length },
      { status: 'Accepted', label: 'Accepted', count: farmerTransactions.value.filter(t => t.status === 'Accepted').length },
      { status: 'Completed', label: 'Completed', count: farmerTransactions.value.filter(t => t.status === 'Completed').length },
      { status: 'Rejected', label: 'Rejected', count: farmerTransactions.value.filter(t => t.status === 'Rejected').length },
    ]
  } else {
    return [
      { status: 'all', label: 'All', count: buyerTransactions.value.length },
      { status: 'Pending', label: 'To Pay', count: buyerTransactions.value.filter(t => t.status === 'Pending').length },
      { status: 'Accepted', label: 'To Ship', count: buyerTransactions.value.filter(t => t.status === 'Accepted').length },
      { status: 'Shipped', label: 'To Receive', count: buyerTransactions.value.filter(t => t.status === 'Shipped').length },
      { status: 'Completed', label: 'Completed', count: buyerTransactions.value.filter(t => t.status === 'Completed').length },
      { status: 'Cancelled', label: 'Cancelled', count: buyerTransactions.value.filter(t => t.status === 'Cancelled').length },
    ]
  }
})

const uniqueTypes = computed(() => {
  return [...new Set(currentTransactions.value.map(t => t.animal.type))].sort()
})

const uniqueFarmers = computed(() => {
  if (currentView.value === 'buyer') {
    return [...new Set(buyerTransactions.value.map(t => t.farmer.name))].sort()
  }
  return []
})

const hasActiveFilters = computed(() => {
  return filters.value.search !== '' || 
    filters.value.statuses.length > 0 || 
    filters.value.types.length > 0 ||
    filters.value.farmers.length > 0 ||
    filters.value.dateFrom !== '' ||
    filters.value.dateTo !== ''
})

const filteredTransactions = computed(() => {
  let filtered: Transaction[] = currentTransactions.value

  if (selectedStatusTab.value !== 'all') {
    filtered = filtered.filter(t => t.status === selectedStatusTab.value)
  }
  
  filtered = filtered.filter(transaction => {
    const f = filters.value
    let matchesSearch = !f.search
      
    if (f.search) {
      const searchTerm = f.search.toLowerCase()
      matchesSearch = 
        transaction.animal.type.toLowerCase().includes(searchTerm) || 
        transaction.animal.breed.toLowerCase().includes(searchTerm) || 
        transaction.id.toLowerCase().includes(searchTerm)
      
      if (currentView.value === 'farmer') {
        const farmerTx = transaction as FarmerTransaction
        matchesSearch = matchesSearch || farmerTx.buyer.name.toLowerCase().includes(searchTerm)
      } else {
        const buyerTx = transaction as BuyerTransaction
        matchesSearch = matchesSearch || 
          buyerTx.farmer.name.toLowerCase().includes(searchTerm) ||
          (buyerTx.farmer.farmName ? buyerTx.farmer.farmName.toLowerCase().includes(searchTerm) : false)
      }
    }
      
    const matchesType = f.types.length === 0 || f.types.includes(transaction.animal.type)
    
    let matchesFarmer = true
    if (currentView.value === 'buyer' && f.farmers.length > 0) {
      const buyerTx = transaction as BuyerTransaction
      matchesFarmer = f.farmers.includes(buyerTx.farmer.name)
    }
    
    let matchesDate = true
    if (f.dateFrom || f.dateTo) {
      const transactionDate = new Date(transaction.date)
      const fromDate = f.dateFrom ? new Date(f.dateFrom) : null
      const toDate = f.dateTo ? new Date(f.dateTo) : null
      
      if (fromDate && transactionDate < fromDate) matchesDate = false
      if (toDate && transactionDate > toDate) matchesDate = false
    }
    
    return matchesSearch && matchesType && matchesFarmer && matchesDate
  })

  return filtered.sort((a, b) => {
    const dateA = new Date(a.date).getTime()
    const dateB = new Date(b.date).getTime()
    
    switch (sortBy.value) {
      case 'date-desc': return dateB - dateA
      case 'date-asc': return dateA - dateB
      case 'price-asc': return a.amount - b.amount
      case 'price-desc': return b.amount - a.amount
      default: return dateB - dateA
    }
  })
})

// ==================== METHODS ====================

const toggleSidebar = () => {
  isSidebarExpanded.value = !isSidebarExpanded.value
}

const updateFilters = (newFilters: TransactionFilters) => {
  filters.value = newFilters
}

const selectStatusTab = (status: string) => {
  selectedStatusTab.value = status
}

const resetFilters = () => {
  filters.value = {
    search: '',
    statuses: [],
    types: [],
    farmers: [],
    dateFrom: '',
    dateTo: ''
  }
  selectedStatusTab.value = 'all'
  showToastNotification('All filters have been reset', 'success')
}

const showToastNotification = (message: string, type: 'success' | 'error' = 'success') => {
  toastMessage.value = message
  toastType.value = type
  showToast.value = true
  setTimeout(() => showToast.value = false, 4000)
}

const viewDetails = (transaction: Transaction): void => {
  selectedTransaction.value = transaction
}

const updateStatus = async (id: string, status: 'Accepted' | 'Rejected'): Promise<void> => {
  if (currentView.value === 'farmer') {
    const dbStatus = status === 'Accepted' ? 'confirmed' : 'cancelled'
    const result = await transactionService.updateOrderStatus(id, dbStatus)
    
    if (result.success) {
      // 🆕 Silent refresh
      await loadTransactionData(true)
      if (selectedTransaction.value?.id === id) {
        selectedTransaction.value = null
      }
      showToastNotification(`Order ${status.toLowerCase()} successfully!`, 'success')
    } else {
      showToastNotification(result.error || 'Failed to update order status', 'error')
    }
  }
}

const cancelOrder = async (id: string): Promise<void> => {
  if (currentView.value === 'buyer') {
    const result = await transactionService.cancelOrder(id)
    
    if (result.success) {
      // 🆕 Silent refresh
      await loadTransactionData(true)
      if (selectedTransaction.value?.id === id) {
        selectedTransaction.value = null
      }
      showToastNotification('Order cancelled successfully!', 'success')
    } else {
      showToastNotification(result.error || 'Failed to cancel order', 'error')
    }
  }
}

const confirmDelivery = async (id: string): Promise<void> => {
  if (currentView.value === 'buyer') {
    const result = await transactionService.confirmDelivery(id)
    
    if (result.success) {
      // 🆕 Silent refresh
      await loadTransactionData(true)
      if (selectedTransaction.value?.id === id) {
        selectedTransaction.value = null
      }
      showToastNotification('Delivery confirmed! Thank you for your purchase.', 'success')
    } else {
      showToastNotification(result.error || 'Failed to confirm delivery', 'error')
    }
  }
}

const markAsShipped = async (id: string): Promise<void> => {
  if (currentView.value === 'farmer') {
    const result = await transactionService.markAsShipped(id)
    
    if (result.success) {
      // 🆕 Silent refresh
      await loadTransactionData(true)
      showToastNotification('Order marked as shipped! Buyer will be notified.', 'success')
    } else {
      showToastNotification(result.error || 'Failed to mark order as shipped', 'error')
    }
  }
}

const markReadyForPickup = async (id: string): Promise<void> => {
  if (currentView.value === 'farmer') {
    const result = await transactionService.markReadyForPickup(id)
    
    if (result.success) {
      // 🆕 Silent refresh
      await loadTransactionData(true)
      showToastNotification('Order marked as ready for pickup! Buyer will be notified.', 'success')
    } else {
      showToastNotification(result.error || 'Failed to mark order as ready for pickup', 'error')
    }
  }
}

const confirmPickup = async (id: string): Promise<void> => {
  if (currentView.value === 'buyer') {
    const result = await transactionService.confirmPickup(id)
    
    if (result.success) {
      // 🆕 Silent refresh
      await loadTransactionData(true)
      if (selectedTransaction.value?.id === id) {
        selectedTransaction.value = null
      }
      showToastNotification('Pickup confirmed! Thank you for your purchase.', 'success')
    } else {
      showToastNotification(result.error || 'Failed to confirm pickup', 'error')
    }
  }
}

const contactPerson = (transaction: Transaction): void => {
  showToastNotification('Opening chat...', 'success')
}

// ==================== RECEIPT METHODS ====================

const generateReceiptNumber = (): string => {
  const prefix = 'RCP'
  const year = new Date().getFullYear()
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0')
  return `${prefix}-${year}-${random}`
}

const openCreateReceiptModal = (transaction: Transaction): void => {
  selectedReceiptTransaction.value = transaction
  
  if ('buyer' in transaction) {
    receiptForm.value = {
      receiptNumber: generateReceiptNumber(),
      issueDate: new Date().toISOString().split('T')[0],
      paymentStatus: 'Paid',
      farmerName: transaction.animal.farmer.farmName || transaction.animal.farmer.name,
      farmerAddress: transaction.animal.farmer.address,
      farmerContact: transaction.animal.farmer.contact,
      farmerEmail: transaction.animal.farmer.email || '',
      farmerTIN: '',
      buyerName: transaction.buyer.name,
      buyerAddress: transaction.buyer.address,
      buyerContact: transaction.buyer.contact,
      buyerEmail: transaction.buyer.email || '',
      notes: `Payment Method: ${transaction.paymentMethod}\nDelivery Method: ${transaction.deliveryMethod}`
    }
  } else {
    receiptForm.value = {
      receiptNumber: generateReceiptNumber(),
      issueDate: new Date().toISOString().split('T')[0],
      paymentStatus: 'Paid',
      farmerName: transaction.farmer.farmName || transaction.farmer.name,
      farmerAddress: transaction.farmer.address,
      farmerContact: transaction.farmer.contact,
      farmerEmail: transaction.farmer.email || '',
      farmerTIN: '',
      buyerName: currentUser.value.name,
      buyerAddress: '',
      buyerContact: '',
      buyerEmail: currentUser.value.email,
      notes: `Payment Method: ${transaction.paymentMethod}\nDelivery Method: ${transaction.deliveryMethod}`
    }
  }
  
  showCreateReceiptModal.value = true
}

const openViewReceiptModal = (transaction: Transaction): void => {
  selectedReceiptTransaction.value = transaction
  showViewReceiptModal.value = true
}

const closeReceiptModals = (): void => {
  showCreateReceiptModal.value = false
  showViewReceiptModal.value = false
  selectedReceiptTransaction.value = null
}

const requestReceipt = (transaction: Transaction): void => {
  showToastNotification('Receipt request sent to farmer!', 'success')
}

const saveReceipt = (form: ReceiptForm): void => {
  if (selectedReceiptTransaction.value) {
    const id = selectedReceiptTransaction.value.id
    
    if (currentView.value === 'farmer') {
      const index = farmerTransactions.value.findIndex(t => t.id === id)
      if (index !== -1) {
        farmerTransactions.value[index].hasReceipt = true
      }
    } else {
      const index = buyerTransactions.value.findIndex(t => t.id === id)
      if (index !== -1) {
        buyerTransactions.value[index].hasReceipt = true
      }
    }
  }
  
  showToastNotification('Receipt saved successfully!', 'success')
  closeReceiptModals()
}

const printReceipt = (): void => {
  window.print()
}

const downloadReceipt = (form: ReceiptForm): void => {
  showToastNotification('Receipt download started...', 'success')
}

// 🆕 Load transaction data with silent option
const loadTransactionData = async (silent = false) => {
  if (!silent) {
    isInitialLoad.value = true
  }
  
  try {
    console.log('🛒 Loading buyer transactions...')
    const buyerResult = await transactionService.getBuyerTransactions()
    if (buyerResult.success && buyerResult.data) {
      buyerTransactions.value = buyerResult.data
      console.log('✅ Loaded buyer transactions:', buyerTransactions.value.length)
    } else {
      console.error('❌ Failed to load buyer transactions:', buyerResult.error)
    }

    if (userIsFarmer.value) {
      console.log('🚜 Loading farmer transactions...')
      const farmerResult = await transactionService.getFarmerTransactions()
      if (farmerResult.success && farmerResult.data) {
        farmerTransactions.value = farmerResult.data
        console.log('✅ Loaded farmer transactions:', farmerTransactions.value.length)
      } else {
        console.error('❌ Failed to load farmer transactions:', farmerResult.error)
      }
    }
  } catch (error) {
    console.error('💥 Error loading transactions:', error)
    if (!silent) {
      showToastNotification('Failed to load transactions', 'error')
    }
  } finally {
    if (!silent) {
      isInitialLoad.value = false
    }
  }
}

const setInitialView = () => {
  if (userIsFarmer.value) {
    currentView.value = 'farmer'
    console.log('📱 Initial view set to: farmer (My Sales)')
  } else {
    currentView.value = 'buyer'
    console.log('📱 Initial view set to: buyer (My Purchases)')
  }
}

const loadUserProfile = async () => {
  try {
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      router.push('/login')
      return
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single()

    if (profile) {
      currentUser.value = {
        isAuthenticated: true,
        role: profile.role || 'Buyer',
        id: user.id,
        email: user.email || '',
        name: profile.first_name && profile.last_name 
          ? `${profile.first_name} ${profile.last_name}`
          : profile.username
      }
      console.log('👤 User loaded:', currentUser.value)
    }
  } catch (error) {
    console.error('Error loading user profile:', error)
  }
}

// 🆕 Handle visibility change
const handleVisibilityChange = async (): Promise<void> => {
  if (document.hidden) {
    lastVisibilityTime = Date.now()
    console.log('👋 Transactions: Tab hidden at', new Date().toLocaleTimeString())
  } else {
    const timeAway = Date.now() - lastVisibilityTime
    const secondsAway = Math.round(timeAway / 1000)
    
    console.log('👀 Transactions: Tab visible again. Time away:', secondsAway, 'seconds')

    if (timeAway > VISIBILITY_REFRESH_THRESHOLD) {
      console.log('🔄 Transactions: Auto-refreshing data after being away...')
      
      // Silent refresh
      await loadTransactionData(true)
      
      console.log('✅ Transactions: Silent auto-refresh complete')
    } else {
      console.log('⏭️ Transactions: Not refreshing (away for only', secondsAway, 'seconds)')
    }
  }
}

// ==================== LIFECYCLE ====================

onMounted(async () => {
  // 🆕 Add visibility listener
  document.addEventListener('visibilitychange', handleVisibilityChange)
  
  await loadUserProfile()
  
  if (!currentUser.value.isAuthenticated) {
    router.push('/login')
    return
  }
  
  setInitialView()
  
  // 🆕 Initial load (NOT silent)
  await loadTransactionData(false)
})

onBeforeUnmount(() => {
  // 🆕 Remove visibility listener
  document.removeEventListener('visibilitychange', handleVisibilityChange)
})

watch(showToast, (newVal) => {
  if (newVal) {
    setTimeout(() => {
      showToast.value = false
    }, 4000)
  }
})
</script>

<style scoped>
.hide-scrollbar::-webkit-scrollbar {
  display: none;
}

.hide-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>