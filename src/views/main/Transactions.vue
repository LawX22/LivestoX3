<!-- Transactions.vue -->
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
            </div>
            <p class="text-green-100 text-sm opacity-90 truncate">
              {{ currentView === 'farmer' 
                ? 'Manage buyer inquiries and completed sales' 
                : 'Track your livestock orders and purchases' 
              }}
            </p>
          </div>
        </div>

        <!-- Right side - View Toggle (for farmers only) -->
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

    <!-- Main Content Container -->
    <div class="flex flex-1 overflow-hidden mt-4">
      <!-- Filters Sidebar Component -->
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

      <!-- Main Content Area -->
      <div class="flex-1 flex flex-col overflow-hidden">
        <!-- Status Tabs (Now positioned above table) -->
        <div class="sticky top-0 z-30 bg-white/80 backdrop-blur-sm border-b border-green-100">
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

        <!-- Transactions Table Component -->
        <TransactionsTable
          :transactions="filteredTransactions"
          :is-farmer-view="currentView === 'farmer'"
          @view-details="viewDetails"
          @update-status="updateStatus"
          @cancel-order="cancelOrder"
          @confirm-delivery="confirmDelivery"
          @contact-person="contactPerson"
          @create-receipt="openCreateReceiptModal"
          @view-receipt="openViewReceiptModal"
          @request-receipt="requestReceipt"
          @reset-filters="resetFilters"
        />
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

    <!-- Receipt Modal Component -->
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
import { ref, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import NavBar from '@/components/NavBar.vue'
import FiltersSidebar from '@/components/Transactions/FilterSidebar.vue'
import TransactionDetailsModal from '@/components/Transactions/TransactionDetailsModal.vue'
import TransactionsTable from '@/components/Transactions/TransactionsTable.vue'
import ReceiptModal from '@/components/Transactions/ReceiptModal.vue'
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
  isAuthenticated: true,
  role: 'farmer', // 'farmer' or 'buyer' only
  id: '1',
  email: 'user@example.com',
  name: 'John Doe'
})

const userIsFarmer = computed(() => currentUser.value.role === 'farmer')
const userIsBuyer = computed(() => currentUser.value.role === 'buyer' || currentUser.value.role === 'user')

const currentView = ref<'farmer' | 'buyer'>('buyer')
const isSidebarExpanded = ref(true)
const selectedTransaction = ref<Transaction | null>(null)
const sortBy = ref('date-desc')
const showToast = ref(false)
const toastMessage = ref('')
const selectedStatusTab = ref<string>('all')

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

  // Filter by selected status tab
  if (selectedStatusTab.value !== 'all') {
    filtered = filtered.filter(t => t.status === selectedStatusTab.value)
  }
  
  // Apply other filters
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

  // Sort
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
      showToastNotification(`Order ${status.toLowerCase()} successfully!`)
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
      showToastNotification('Delivery confirmed! Thank you for your purchase.')
    }
  }
}

const contactPerson = (transaction: Transaction): void => {
  showToastNotification('Opening chat...')
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
  
  // Pre-fill form with transaction data
  if ('buyer' in transaction) {
    // Farmer view
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
    // Buyer view
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
  showToastNotification('Receipt request sent to farmer!')
}

const saveReceipt = (form: ReceiptForm): void => {
  // Update transaction to mark hasReceipt as true
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
  
  showToastNotification('Receipt saved successfully!')
  closeReceiptModals()
}

const printReceipt = (): void => {
  window.print()
}

const downloadReceipt = (form: ReceiptForm): void => {
  showToastNotification('Receipt download started...')
  // Implement PDF download logic here
}

const loadTransactionData = () => {
  if (userIsFarmer.value) {
    farmerTransactions.value = [
      {
        id: 'TXN-78901',
        animal: {
          id: 1,
          uuid: 'uuid-animal-001',
          title: 'Premium Angus Cattle',
          type: 'Cattle',
          breed: 'Angus',
          weight: 550,
          weightUnit: 'kg',
          quantity: 1,
          age: '2 years',
          gender: 'Male',
          status: 'Available',
          healthStatus: ['Vaccinated', 'Dewormed'],
          price: 45000,
          priceUnit: 'per head',
          deliveryOptions: ['Pickup', 'Delivery'],
          paymentMethods: ['Cash', 'Bank Transfer'],
          images: ['https://images.unsplash.com/photo-1545468800-85cc9bc6ecf7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'],
          description: 'Healthy Angus cattle, vaccinated and dewormed',
          datePosted: new Date(Date.now() - 86400000 * 30).toISOString(),
          farmer: {
            id: 1,
            name: 'John Farmer',
            farmName: 'Green Valley Farm',
            contact: '+63 917 111 2222',
            email: 'farmer@example.com',
            address: 'Laguna, Philippines',
            avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
          },
          location: 'Laguna, Philippines'
        },
        buyer: {
          id: 101,
          name: 'Juan Dela Cruz',
          contact: '+63 917 123 4567',
          email: 'juan@example.com',
          address: '123 Main St, Quezon City',
          avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
        },
        date: new Date(Date.now() - 86400000 * 2).toISOString(),
        status: 'Pending',
        amount: 45000,
        paymentMethod: 'Cash on Delivery',
        deliveryMethod: 'Pickup',
        message: 'I would like to visit your farm to see the cattle before finalizing the purchase.',
        hasReceipt: false
      }
    ]
  }

  buyerTransactions.value = [
    {
      id: 'ORD-56789',
      animal: {
        id: 5,
        uuid: 'uuid-animal-005',
        title: 'Premium Holstein Dairy Cattle',
        type: 'Cattle',
        breed: 'Holstein',
        weight: 600,
        weightUnit: 'kg',
        quantity: 1,
        age: '3 years',
        gender: 'Female',
        status: 'Available',
        healthStatus: ['Vaccinated', 'Health Certified'],
        price: 85000,
        priceUnit: 'per head',
        deliveryOptions: ['Delivery'],
        paymentMethods: ['Cash', 'Bank Transfer'],
        images: ['https://images.unsplash.com/photo-1560114928-40f1f1eb26a0?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'],
        description: 'Dairy cattle, excellent milk production',
        datePosted: new Date(Date.now() - 86400000 * 15).toISOString(),
        farmer: {
          id: 201,
          name: 'Green Valley Farm',
          farmName: 'Green Valley Dairy',
          contact: '+63 917 555 0123',
          email: 'greenvalley@example.com',
          address: 'Km 15 National Highway, Laguna',
          avatar: 'https://randomuser.me/api/portraits/men/78.jpg'
        },
        location: 'Laguna, Philippines'
      },
      farmer: {
        id: 201,
        name: 'Green Valley Farm',
        farmName: 'Green Valley Dairy',
        contact: '+63 917 555 0123',
        email: 'greenvalley@example.com',
        address: 'Km 15 National Highway, Laguna',
        avatar: 'https://randomuser.me/api/portraits/men/78.jpg'
      },
      date: new Date(Date.now() - 86400000 * 1).toISOString(),
      status: 'Pending',
      amount: 85000,
      paymentMethod: 'Cash on Delivery',
      deliveryMethod: 'Delivery',
      estimatedDelivery: new Date(Date.now() + 86400000 * 3).toISOString(),
      trackingNumber: 'TRK-2024-002',
      hasReceipt: false
    }
  ]
}

const setInitialView = () => {
  if (userIsBuyer.value && !userIsFarmer.value) {
    currentView.value = 'buyer'
  } else if (userIsFarmer.value) {
    currentView.value = 'farmer'
  } else {
    currentView.value = 'buyer'
  }
}

// ==================== LIFECYCLE ====================

onMounted(() => {
  if (!currentUser.value.isAuthenticated) {
    router.push('/login')
    return
  }
  
  setInitialView()
  loadTransactionData()
})

watch(showToast, (newVal) => {
  if (newVal) {
    setTimeout(() => {
      showToast.value = false
    }, 4000)
  }
})
</script>