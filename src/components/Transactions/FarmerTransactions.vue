<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <!-- NavBar -->
    <NavBar />

    <!-- Header Section with Back Button -->
    <div class="p-4 md:p-6 border-b border-gray-200 bg-white">
      <div class="flex items-center gap-4">
        <div>
          <h1 class="text-2xl font-bold text-green-800">Your Transactions</h1>
          <p class="text-gray-500 mt-1">Manage buyer inquiries and completed sales</p>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="flex-1 overflow-y-auto p-4 md:p-6">
      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-500">Total Inquiries</p>
              <p class="text-2xl font-bold text-gray-900 mt-1">24</p>
            </div>
            <div class="p-3 rounded-full bg-green-100 text-green-600">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-500">Pending Transactions</p>
              <p class="text-2xl font-bold text-gray-900 mt-1">8</p>
            </div>
            <div class="p-3 rounded-full bg-yellow-100 text-yellow-600">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-500">Total Earnings</p>
              <p class="text-2xl font-bold text-gray-900 mt-1">₱124,500</p>
            </div>
            <div class="p-3 rounded-full bg-blue-100 text-blue-600">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Tabs -->
      <div class="mb-6 border-b border-gray-200">
        <nav class="flex space-x-8">
          <button 
            v-for="tab in tabs"
            :key="tab.id"
            @click="activeTab = tab.id"
            :class="[activeTab === tab.id ? 'border-green-500 text-green-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300', 'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm']"
          >
            {{ tab.name }}
            <span 
              v-if="tab.count"
              :class="[activeTab === tab.id ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600', 'ml-2 py-0.5 px-2 rounded-full text-xs']"
            >
              {{ tab.count }}
            </span>
          </button>
        </nav>
      </div>

      <!-- Transactions Table -->
      <div class="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Livestock</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Buyer</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="transaction in filteredTransactions" :key="transaction.id">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="flex-shrink-0 h-10 w-10">
                      <img class="h-10 w-10 rounded-full object-cover" :src="transaction.livestock.image" alt="">
                    </div>
                    <div class="ml-4">
                      <div class="text-sm font-medium text-gray-900">{{ transaction.livestock.type }}</div>
                      <div class="text-sm text-gray-500">{{ transaction.livestock.breed }}</div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="flex-shrink-0 h-10 w-10">
                      <img class="h-10 w-10 rounded-full object-cover" :src="transaction.buyer.avatar" alt="">
                    </div>
                    <div class="ml-4">
                      <div class="text-sm font-medium text-gray-900">{{ transaction.buyer.name }}</div>
                      <div class="text-sm text-gray-500">{{ transaction.buyer.contact }}</div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ formatDate(transaction.date) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span :class="`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(transaction.status)}`">
                    {{ transaction.status }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  ₱{{ transaction.amount.toLocaleString() }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button 
                    @click="viewDetails(transaction)"
                    class="text-green-600 hover:text-green-900 mr-4"
                  >
                    View
                  </button>
                  <button 
                    v-if="transaction.status === 'Pending'"
                    @click="updateStatus(transaction.id, 'Accepted')"
                    class="text-blue-600 hover:text-blue-900 mr-4"
                  >
                    Accept
                  </button>
                  <button 
                    v-if="transaction.status === 'Pending'"
                    @click="updateStatus(transaction.id, 'Rejected')"
                    class="text-red-600 hover:text-red-900"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Empty State -->
        <div 
          v-if="filteredTransactions.length === 0"
          class="text-center py-12"
        >
          <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 class="mt-2 text-sm font-medium text-gray-900">No transactions found</h3>
          <p class="mt-1 text-sm text-gray-500">You don't have any {{ activeTab.toLowerCase() }} transactions yet.</p>
        </div>
      </div>

      <!-- Pagination -->
      <div class="flex items-center justify-between mt-6">
        <div class="flex-1 flex justify-between sm:hidden">
          <button class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
            Previous
          </button>
          <button class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
            Next
          </button>
        </div>
        <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p class="text-sm text-gray-700">
              Showing <span class="font-medium">1</span> to <span class="font-medium">5</span> of <span class="font-medium">12</span> results
            </p>
          </div>
          <div>
            <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
              <button class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                <span class="sr-only">Previous</span>
                <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
              </button>
              <button aria-current="page" class="z-10 bg-green-50 border-green-500 text-green-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                1
              </button>
              <button class="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                2
              </button>
              <button class="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                3
              </button>
              <button class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                <span class="sr-only">Next</span>
                <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                </svg>
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>

    <!-- Transaction Details Modal -->
    <div v-if="selectedTransaction" class="fixed inset-0 overflow-hidden z-50">
      <div class="absolute inset-0 overflow-hidden">
        <div class="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" @click="selectedTransaction = null"></div>
        <div class="fixed inset-y-0 right-0 pl-10 max-w-full flex">
          <div class="w-screen max-w-md">
            <div class="h-full flex flex-col bg-white shadow-xl overflow-y-scroll">
              <div class="flex-1 py-6 overflow-y-auto px-4 sm:px-6">
                <div class="flex items-start justify-between">
                  <h2 class="text-lg font-medium text-gray-900">Transaction Details</h2>
                  <div class="ml-3 h-7 flex items-center">
                    <button 
                      @click="selectedTransaction = null"
                      class="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      <span class="sr-only">Close panel</span>
                      <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>

                <div class="mt-8">
                  <div class="flow-root">
                    <div class="border-b border-gray-200 pb-6">
                      <div class="flex items-center">
                        <div class="flex-shrink-0 h-20 w-20 rounded-md overflow-hidden">
                          <img :src="selectedTransaction.livestock.image" class="h-full w-full object-cover">
                        </div>
                        <div class="ml-4 flex-1">
                          <div>
                            <div class="flex justify-between text-base font-medium text-gray-900">
                              <h3>{{ selectedTransaction.livestock.type }} ({{ selectedTransaction.livestock.breed }})</h3>
                              <p class="ml-4">₱{{ selectedTransaction.amount.toLocaleString() }}</p>
                            </div>
                            <p class="mt-1 text-sm text-gray-500">{{ selectedTransaction.livestock.description }}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div class="py-6 border-b border-gray-200">
                      <h3 class="text-lg font-medium text-gray-900 mb-4">Buyer Information</h3>
                      <div class="flex items-start">
                        <div class="flex-shrink-0">
                          <img class="h-12 w-12 rounded-full" :src="selectedTransaction.buyer.avatar" alt="">
                        </div>
                        <div class="ml-4">
                          <h4 class="text-sm font-medium text-gray-900">{{ selectedTransaction.buyer.name }}</h4>
                          <p class="text-sm text-gray-500">{{ selectedTransaction.buyer.contact }}</p>
                          <p class="text-sm text-gray-500">{{ selectedTransaction.buyer.address }}</p>
                        </div>
                      </div>
                    </div>

                    <div class="py-6 border-b border-gray-200">
                      <h3 class="text-lg font-medium text-gray-900 mb-4">Transaction Details</h3>
                      <dl class="space-y-4">
                        <div class="flex items-center justify-between">
                          <dt class="text-sm text-gray-600">Transaction ID</dt>
                          <dd class="text-sm font-medium text-gray-900">{{ selectedTransaction.id }}</dd>
                        </div>
                        <div class="flex items-center justify-between">
                          <dt class="text-sm text-gray-600">Date</dt>
                          <dd class="text-sm font-medium text-gray-900">{{ formatDate(selectedTransaction.date) }}</dd>
                        </div>
                        <div class="flex items-center justify-between">
                          <dt class="text-sm text-gray-600">Status</dt>
                          <dd class="text-sm font-medium text-gray-900">
                            <span :class="`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusClass(selectedTransaction.status)}`">
                              {{ selectedTransaction.status }}
                            </span>
                          </dd>
                        </div>
                        <div class="flex items-center justify-between">
                          <dt class="text-sm text-gray-600">Payment Method</dt>
                          <dd class="text-sm font-medium text-gray-900">{{ selectedTransaction.paymentMethod }}</dd>
                        </div>
                        <div class="flex items-center justify-between">
                          <dt class="text-sm text-gray-600">Delivery Method</dt>
                          <dd class="text-sm font-medium text-gray-900">{{ selectedTransaction.deliveryMethod }}</dd>
                        </div>
                      </dl>
                    </div>

                    <div class="py-6">
                      <h3 class="text-lg font-medium text-gray-900 mb-4">Buyer's Message</h3>
                      <div class="bg-gray-50 p-4 rounded-lg">
                        <p class="text-sm text-gray-700">{{ selectedTransaction.message || "No message provided by the buyer." }}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="border-t border-gray-200 px-4 py-6 sm:px-6">
                <div class="flex justify-between text-base font-medium text-gray-900">
                  <p>Total</p>
                  <p>₱{{ selectedTransaction.amount.toLocaleString() }}</p>
                </div>
                <p class="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                <div class="mt-6 flex space-x-4">
                  <button 
                    v-if="selectedTransaction.status === 'Pending'"
                    @click="updateStatus(selectedTransaction.id, 'Accepted')"
                    class="flex-1 bg-green-600 border border-transparent rounded-md py-3 px-4 flex items-center justify-center text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    Accept Offer
                  </button>
                  <button 
                    v-if="selectedTransaction.status === 'Pending'"
                    @click="updateStatus(selectedTransaction.id, 'Rejected')"
                    class="flex-1 bg-white border border-gray-300 rounded-md py-3 px-4 flex items-center justify-center text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    Reject Offer
                  </button>
                  <button 
                    v-if="selectedTransaction.status !== 'Pending'"
                    @click="selectedTransaction = null"
                    class="flex-1 bg-white border border-gray-300 rounded-md py-3 px-4 flex items-center justify-center text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import NavBar from '../../components/NavBar.vue'

interface Livestock {
  id: number
  type: string
  breed: string
  description: string
  image: string
}

interface Buyer {
  id: number
  name: string
  contact: string
  address: string
  avatar: string
}

interface Transaction {
  id: string
  livestock: Livestock
  buyer: Buyer
  date: string
  status: 'Pending' | 'Accepted' | 'Rejected' | 'Completed'
  amount: number
  paymentMethod: string
  deliveryMethod: string
  message?: string
}

const activeTab = ref<'all' | 'pending' | 'accepted' | 'completed'>('all')
const selectedTransaction = ref<Transaction | null>(null)

const tabs = [
  { id: 'all', name: 'All Transactions', count: 12 },
  { id: 'pending', name: 'Pending', count: 5 },
  { id: 'accepted', name: 'Accepted', count: 3 },
  { id: 'completed', name: 'Completed', count: 4 }
]

const transactions = ref<Transaction[]>([
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
    paymentMethod: 'Bank Transfer',
    deliveryMethod: 'Pickup',
    message: 'I would like to visit your farm to see the cattle before finalizing the purchase.'
  },
  {
    id: 'TXN-78902',
    livestock: {
      id: 2,
      type: 'Pig',
      breed: 'Large White',
      description: 'Healthy pigs ready for market',
      image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    },
    buyer: {
      id: 102,
      name: 'Maria Santos',
      contact: '+63 918 765 4321',
      address: '456 Farm Road, Bulacan',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
    },
    date: new Date(Date.now() - 86400000 * 5).toISOString(),
    status: 'Accepted',
    amount: 12000,
    paymentMethod: 'Cash on Delivery',
    deliveryMethod: 'Delivery',
    message: 'Need 10 pigs for my restaurant. Can you deliver next week?'
  },
  {
    id: 'TXN-78903',
    livestock: {
      id: 3,
      type: 'Goat',
      breed: 'Boer',
      description: 'Purebred Boer goats, excellent for breeding',
      image: 'https://images.unsplash.com/photo-1551290464-66719418ca54?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    },
    buyer: {
      id: 103,
      name: 'Carlos Reyes',
      contact: '+63 919 555 1234',
      address: '789 Hillside, Rizal',
      avatar: 'https://randomuser.me/api/portraits/men/22.jpg'
    },
    date: new Date(Date.now() - 86400000 * 10).toISOString(),
    status: 'Completed',
    amount: 24000,
    paymentMethod: 'GCash',
    deliveryMethod: 'Pickup',
    message: 'Looking for quality breeding goats. Please contact me.'
  },
  {
    id: 'TXN-78905',
    livestock: {
      id: 5,
      type: 'Sheep',
      breed: 'Dorper',
      description: 'Dorper sheep known for excellent meat quality',
      image: 'https://images.unsplash.com/photo-1593369196682-6d8ec3ff3d0f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    },
    buyer: {
      id: 105,
      name: 'Roberto Cruz',
      contact: '+63 921 456 2345',
      address: '654 Wool St, Benguet',
      avatar: 'https://randomuser.me/api/portraits/men/55.jpg'
    },
    date: new Date(Date.now() - 86400000 * 7).toISOString(),
    status: 'Rejected',
    amount: 30000,
    paymentMethod: 'Cash on Delivery',
    deliveryMethod: 'Pickup',
    message: 'Interested in your sheep but the price is too high. Can you lower it?'
  }
])

const filteredTransactions = computed(() => {
  if (activeTab.value === 'all') return transactions.value
  return transactions.value.filter(t =>
    activeTab.value === 'pending'
      ? t.status === 'Pending'
      : activeTab.value === 'accepted'
        ? t.status === 'Accepted'
        : activeTab.value === 'completed'
          ? t.status === 'Completed'
          : true
  )
})

const viewDetails = (transaction: Transaction): void => {
  selectedTransaction.value = transaction
}

const updateStatus = (id: string, status: 'Accepted' | 'Rejected'): void => {
  const transaction = transactions.value.find(t => t.id === id)
  if (transaction) {
    transaction.status = status
    selectedTransaction.value = null
  }
}

const formatDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' }
  return new Date(dateString).toLocaleDateString(undefined, options)
}

const getStatusClass = (status: string): string => {
  switch (status) {
    case 'Pending':
      return 'bg-yellow-100 text-yellow-800'
    case 'Accepted':
      return 'bg-blue-100 text-blue-800'
    case 'Completed':
      return 'bg-green-100 text-green-800'
    case 'Rejected':
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}
</script>