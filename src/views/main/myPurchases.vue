<!-- myPurchases.vue -->
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
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <div class="min-w-0">
            <h1 class="text-xl font-bold text-white truncate">My Purchases</h1>
            <p class="text-green-100 text-sm opacity-90 truncate">
              Track your livestock orders and purchases
            </p>
          </div>
        </div>

        <!-- Right side - Stats Cards (Compact) -->
        <div class="grid grid-cols-3 gap-2 w-full md:w-auto">
          <div class="bg-white/20 backdrop-blur-sm rounded-md p-1.5 border border-white/20">
            <div class="flex items-center gap-1.5">
              <div class="p-1 rounded-full bg-green-100 text-green-600">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <div>
                <p class="text-[10px] font-medium text-green-100 leading-tight">Total Orders</p>
                <p class="text-sm font-bold text-white">{{ transactions.length }}</p>
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
                <p class="text-[10px] font-medium text-green-100 leading-tight">Total Spent</p>
                <p class="text-sm font-bold text-white">₱{{ totalSpent.toLocaleString() }}</p>
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
        :status-options="statusOptions"
        :unique-types="uniqueTypes"
        :has-active-filters="hasActiveFilters"
        @toggle="toggleSidebar"
        @update:filters="updateFilters"
        @reset="resetFilters"
      />

      <!-- Main Content Area -->
      <div class="flex-1 flex flex-col overflow-hidden">
        <!-- Results Summary -->
        <div class="sticky top-0 z-30 bg-white/90 backdrop-blur-sm border-b border-white/40 px-4 py-2">
          <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <div class="flex items-center gap-2">
              <div class="w-7 h-7 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg flex items-center justify-center">
                <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V4z" />
                </svg>
              </div>
              <div>
                <h3 class="text-sm font-bold text-gray-800">
                  {{ filteredTransactions.length }} {{ filteredTransactions.length === 1 ? 'Order' : 'Orders' }} Found
                </h3>
              </div>
            </div>

            <!-- Sort By Filter -->
            <div class="flex items-center gap-2">
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

        <!-- Transactions Table Component -->
        <TransactionsTable
          :transactions="filteredTransactions"
          :sort-by="sortBy"
          @view-details="viewDetails"
          @cancel-order="cancelOrder"
          @confirm-delivery="confirmDelivery"
          @reset-filters="resetFilters"
        />
      </div>
    </div>

    <!-- Transaction Details Modal Component -->
    <TransactionDetailsModal
      :transaction="selectedTransaction"
      @close="selectedTransaction = null"
      @cancel-order="cancelOrder"
      @confirm-delivery="confirmDelivery"
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
import { ref, computed } from 'vue'
import NavBar from '../../components/NavBar.vue'
import FiltersSidebar from '../../components/myPurchases/FiltersSidebar.vue'
import TransactionsTable from '../../components/myPurchases/TransactionsTable.vue'
import TransactionDetailsModal from '../../components/myPurchases/TransactionDetailsModal.vue'

// Interfaces
interface Livestock {
  id: number
  type: string
  breed: string
  description: string
  image: string
}

interface Seller {
  id: number
  name: string
  farm: string
  contact: string
  location: string
  avatar: string
}

interface Transaction {
  id: string
  livestock: Livestock
  seller: Seller
  date: string
  status: 'Pending' | 'Accepted' | 'Shipped' | 'Completed' | 'Cancelled'
  amount: number
  paymentMethod: string
  deliveryMethod: string
  message?: string
  trackingNumber?: string
  estimatedDelivery?: string
}

interface Filters {
  search: string
  statuses: string[]
  types: string[]
  sellers: string[]
  dateFrom: string
  dateTo: string
}

// Reactive state
const isSidebarExpanded = ref(true);
const selectedTransaction = ref<Transaction | null>(null);
const sortBy = ref('date-desc');
const showToast = ref(false);
const toastMessage = ref('');

const filters = ref<Filters>({
  search: '',
  statuses: [],
  types: [],
  sellers: [],
  dateFrom: '',
  dateTo: ''
});

const statusOptions = ['Pending', 'Accepted', 'Shipped', 'Completed', 'Cancelled'];

// Sample data
const transactions = ref<Transaction[]>([
  {
    id: 'ORD-78901',
    livestock: {
      id: 1,
      type: 'Cattle',
      breed: 'Angus',
      description: 'Healthy Angus cattle, vaccinated and dewormed',
      image: 'https://images.unsplash.com/photo-1545468800-85cc9bc6ecf7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    },
    seller: {
      id: 201,
      name: 'Farmers Co-op',
      farm: 'Green Pastures Farm',
      contact: '+63 917 765 4321',
      location: 'Tarlac',
      avatar: 'https://randomuser.me/api/portraits/men/41.jpg'
    },
    date: new Date(Date.now() - 86400000 * 2).toISOString(),
    status: 'Pending',
    amount: 45000,
    paymentMethod: 'Cash on Delivery',
    deliveryMethod: 'Pickup',
    message: 'I would like to visit the farm to see the cattle before finalizing the purchase.'
  },
  {
    id: 'ORD-78902',
    livestock: {
      id: 2,
      type: 'Pig',
      breed: 'Large White',
      description: 'Healthy pigs ready for market',
      image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    },
    seller: {
      id: 202,
      name: 'Juan Dela Cruz',
      farm: 'Delacruz Swine Farm',
      contact: '+63 918 123 4567',
      location: 'Bulacan',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
    },
    date: new Date(Date.now() - 86400000 * 5).toISOString(),
    status: 'Accepted',
    amount: 12000,
    paymentMethod: 'Cash on Delivery',
    deliveryMethod: 'Delivery',
    message: 'Need 10 pigs for my restaurant. Can you deliver next week?',
    estimatedDelivery: new Date(Date.now() + 86400000 * 3).toISOString()
  },
  {
    id: 'ORD-78903',
    livestock: {
      id: 3,
      type: 'Goat',
      breed: 'Boer',
      description: 'Purebred Boer goats, excellent for breeding',
      image: 'https://images.unsplash.com/photo-1551290464-66719418ca54?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    },
    seller: {
      id: 203,
      name: 'Maria Santos',
      farm: 'Mountain View Goat Farm',
      contact: '+63 919 555 6789',
      location: 'Rizal',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
    },
    date: new Date(Date.now() - 86400000 * 10).toISOString(),
    status: 'Completed',
    amount: 24000,
    paymentMethod: 'Cash on Delivery',
    deliveryMethod: 'Pickup',
    message: 'Looking for quality breeding goats. Please contact me.'
  }
]);

// Computed properties
const pendingCount = computed(() => 
  transactions.value.filter(t => t.status === 'Pending').length
);

const totalSpent = computed(() => {
  return transactions.value
    .filter(t => t.status === 'Completed' || t.status === 'Shipped' || t.status === 'Accepted')
    .reduce((sum, transaction) => sum + transaction.amount, 0);
});

const uniqueTypes = computed(() => {
  return [...new Set(transactions.value.map(t => t.livestock.type))].sort();
});

const hasActiveFilters = computed(() => {
  return filters.value.search !== '' || 
    filters.value.statuses.length > 0 || 
    filters.value.types.length > 0 ||
    filters.value.sellers.length > 0 ||
    filters.value.dateFrom !== '' ||
    filters.value.dateTo !== '';
});

const filteredTransactions = computed(() => {
  return transactions.value.filter(transaction => {
    const f = filters.value;
    const matchesSearch = !f.search || 
      transaction.livestock.type.toLowerCase().includes(f.search.toLowerCase()) || 
      transaction.livestock.breed.toLowerCase().includes(f.search.toLowerCase()) || 
      transaction.seller.name.toLowerCase().includes(f.search.toLowerCase()) ||
      transaction.seller.farm.toLowerCase().includes(f.search.toLowerCase()) ||
      transaction.id.toLowerCase().includes(f.search.toLowerCase());
    
    const matchesStatus = f.statuses.length === 0 || f.statuses.includes(transaction.status);
    const matchesType = f.types.length === 0 || f.types.includes(transaction.livestock.type);
    const matchesSeller = f.sellers.length === 0 || f.sellers.includes(transaction.seller.name);
    
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
});

// Methods
const toggleSidebar = () => {
  isSidebarExpanded.value = !isSidebarExpanded.value;
};

const updateFilters = (newFilters: Filters) => {
  filters.value = newFilters;
};

const resetFilters = () => {
  filters.value = {
    search: '',
    statuses: [],
    types: [],
    sellers: [],
    dateFrom: '',
    dateTo: ''
  };
  showToastNotification('All filters have been reset');
};

const showToastNotification = (message: string) => {
  toastMessage.value = message;
  showToast.value = true;
  setTimeout(() => showToast.value = false, 4000);
};

const viewDetails = (transaction: Transaction): void => {
  selectedTransaction.value = transaction;
};

const cancelOrder = (id: string): void => {
  const index = transactions.value.findIndex(t => t.id === id);
  if (index !== -1) {
    transactions.value[index].status = 'Cancelled';
    selectedTransaction.value = null;
    showToastNotification('Order cancelled successfully!');
  }
};

const confirmDelivery = (id: string): void => {
  const index = transactions.value.findIndex(t => t.id === id);
  if (index !== -1) {
    transactions.value[index].status = 'Completed';
    selectedTransaction.value = null;
    showToastNotification('Delivery confirmed successfully!');
  }
};

const formatDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const getStatusClass = (status: string): string => {
  switch (status) {
    case 'Pending': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
    case 'Accepted': return 'bg-blue-100 text-blue-800 border-blue-300';
    case 'Shipped': return 'bg-purple-100 text-purple-800 border-purple-300';
    case 'Completed': return 'bg-green-100 text-green-800 border-green-300';
    case 'Cancelled': return 'bg-red-100 text-red-800 border-red-300';
    default: return 'bg-gray-100 text-gray-800 border-gray-300';
  }
};
</script>