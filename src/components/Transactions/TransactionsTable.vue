<!-- components/Transactions/TransactionsTable.vue -->
<template>
  <div class="flex-1 overflow-y-auto">
    <div class="p-4">
      <!-- Table View -->
      <div v-if="transactions.length > 0" class="bg-white/95 backdrop-blur-sm rounded-xl border border-white/60 overflow-hidden shadow-lg">
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transaction</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{{ isFarmerView ? 'Buyer' : 'Seller' }}</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr 
                v-for="transaction in transactions" 
                :key="transaction.id"
                class="hover:bg-gray-50 transition-colors duration-150"
              >
                <!-- Livestock Information -->
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <img 
                      :src="transaction.livestock.image" 
                      :alt="transaction.livestock.type"
                      class="w-12 h-12 rounded-lg object-cover shadow-sm"
                    />
                    <div class="ml-4">
                      <div class="text-sm font-medium text-gray-900">
                        {{ transaction.livestock.type }} - {{ transaction.livestock.breed }}
                      </div>
                      <div class="text-xs text-gray-400 mt-1">
                        ID: {{ transaction.id }}
                      </div>
                    </div>
                  </div>
                </td>

                <!-- Counterparty Information -->
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <img 
                      :src="isFarmerView ? (transaction as FarmerTransaction).buyer.avatar : (transaction as BuyerTransaction).seller.avatar" 
                      :alt="isFarmerView ? (transaction as FarmerTransaction).buyer.name : (transaction as BuyerTransaction).seller.name"
                      class="w-8 h-8 rounded-full object-cover"
                    />
                    <div class="ml-3">
                      <div class="text-sm font-medium text-gray-900">
                        {{ isFarmerView ? (transaction as FarmerTransaction).buyer.name : (transaction as BuyerTransaction).seller.name }}
                      </div>
                      <div class="text-sm text-gray-500">
                        {{ isFarmerView ? (transaction as FarmerTransaction).buyer.address : (transaction as BuyerTransaction).seller.address }}
                      </div>
                      <div v-if="!isFarmerView" class="text-xs text-gray-400">
                        {{ (transaction as BuyerTransaction).seller.farm }}
                      </div>
                    </div>
                  </div>
                </td>

                <!-- Date -->
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ formatDate(transaction.date) }}</div>
                  <div class="text-sm text-gray-500">{{ formatTime(transaction.date) }}</div>
                </td>

                <!-- Status -->
                <td class="px-6 py-4 whitespace-nowrap">
                  <span :class="getStatusClasses(transaction.status)" class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium">
                    {{ transaction.status }}
                  </span>
                  <div v-if="!isFarmerView && (transaction as BuyerTransaction).trackingNumber" class="text-xs text-gray-500 mt-1">
                    Track: {{ (transaction as BuyerTransaction).trackingNumber }}
                  </div>
                </td>

                <!-- Amount -->
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm font-semibold text-gray-900">₱{{ transaction.amount.toLocaleString() }}</div>
                  <div class="text-xs text-gray-500">{{ transaction.paymentMethod }}</div>
                  <div class="text-xs text-gray-400">{{ transaction.deliveryMethod }}</div>
                </td>

                <!-- Actions -->
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div class="flex items-center space-x-2">
                    <!-- View Details Button -->
                    <button 
                      @click="emit('view-details', transaction)"
                      class="text-indigo-600 hover:text-indigo-900 transition-colors duration-200 p-2 rounded-lg hover:bg-indigo-50"
                      title="View Details"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </button>

                    <!-- Action Buttons based on status and view -->
                    <template v-if="isFarmerView">
                      <button 
                        v-if="transaction.status === 'Pending'"
                        @click="emit('update-status', transaction.id, 'Accepted')"
                        class="text-green-600 hover:text-green-900 transition-colors duration-200 p-2 rounded-lg hover:bg-green-50"
                        title="Accept Order"
                      >
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                        </svg>
                      </button>
                      <button 
                        v-if="transaction.status === 'Pending'"
                        @click="confirmCancel(transaction.id, 'Rejected', 'farmer')"
                        class="text-red-600 hover:text-red-900 transition-colors duration-200 p-2 rounded-lg hover:bg-red-50"
                        title="Reject Order"
                      >
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </template>

                    <template v-if="!isFarmerView">
                      <button 
                        v-if="transaction.status === 'Pending' || transaction.status === 'Accepted'"
                        @click="confirmCancel(transaction.id, 'Cancelled', 'buyer')"
                        class="text-red-600 hover:text-red-900 transition-colors duration-200 p-2 rounded-lg hover:bg-red-50"
                        title="Cancel Order"
                      >
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                      <button 
                        v-if="transaction.status === 'Shipped'"
                        @click="emit('confirm-delivery', transaction.id)"
                        class="text-green-600 hover:text-green-900 transition-colors duration-200 p-2 rounded-lg hover:bg-green-50"
                        title="Confirm Delivery"
                      >
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                        </svg>
                      </button>
                    </template>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="flex flex-col items-center justify-center py-12">
        <div class="bg-white/95 backdrop-blur-sm p-6 rounded-xl border border-white/60 max-w-md text-center shadow-xl">
          <div class="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-inner">
            <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <h3 class="text-lg font-bold text-gray-800 mb-2">
            No {{ isFarmerView ? 'Transactions' : 'Orders' }} Found
          </h3>
          <p class="text-xs text-gray-500 mb-4 leading-relaxed">
            {{ isFarmerView 
              ? 'We couldn\'t find any transactions matching your current search criteria. Try adjusting your filters or check back later for new inquiries.'
              : 'We couldn\'t find any orders matching your current search criteria. Try adjusting your filters or browse available livestock.'
            }}
          </p>
          <div class="flex flex-col sm:flex-row gap-2 justify-center">
            <slot name="empty-state-actions">
              <!-- Default empty state actions slot -->
              <button 
                @click="emit('reset-filters')"
                class="px-4 py-2 bg-gradient-to-r from-green-600 via-green-700 to-emerald-700 hover:from-green-700 hover:via-green-800 hover:to-emerald-800 text-white rounded-lg text-xs font-bold transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2 justify-center transform hover:scale-105"
              >
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Reset Filters
              </button>
            </slot>
          </div>
        </div>
      </div>

      <!-- Warning Modal -->
      <div v-if="showWarningModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div class="bg-white rounded-xl max-w-md w-full p-6 shadow-2xl">
          <div class="flex items-center mb-4">
            <div class="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4">
              <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h3 class="text-lg font-bold text-gray-900">Cancel Order</h3>
          </div>
          
          <p class="text-gray-600 mb-6">
            {{ warningMessage }}
          </p>

          <div class="flex space-x-3">
            <button 
              @click="proceedWithCancel"
              class="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg font-medium transition-colors duration-200"
            >
              Yes, Cancel Order
            </button>
            <button 
              @click="cancelCancel"
              class="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-lg font-medium transition-colors duration-200"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// Type Definitions
interface Livestock {
  id: number
  type: string
  breed: string
  description: string
  image: string
}

interface Person {
  id: number
  name: string
  contact: string
  address: string
  avatar?: string
  farm?: string
}

interface FarmerTransaction {
  id: string
  livestock: Livestock
  buyer: Person
  date: string
  status: 'Pending' | 'Accepted' | 'Rejected' | 'Completed'
  amount: number
  paymentMethod: string
  deliveryMethod: string
  message?: string
}

interface BuyerTransaction {
  id: string
  livestock: Livestock
  seller: Person
  date: string
  status: 'Pending' | 'Accepted' | 'Shipped' | 'Completed' | 'Cancelled'
  amount: number
  paymentMethod: string
  deliveryMethod: string
  estimatedDelivery?: string
  trackingNumber?: string
  message?: string
}

type Transaction = FarmerTransaction | BuyerTransaction

interface Props {
  transactions: Transaction[]
  isFarmerView: boolean
}

defineProps<Props>()

const emit = defineEmits<{
  'view-details': [transaction: Transaction]
  'update-status': [id: string, status: 'Accepted' | 'Rejected']
  'cancel-order': [id: string]
  'confirm-delivery': [id: string]
  'reset-filters': []
}>()

// Warning modal state
const showWarningModal = ref(false)
const pendingCancelId = ref<string | null>(null)
const pendingCancelStatus = ref<'Rejected' | 'Cancelled' | null>(null)
const pendingCancelType = ref<'farmer' | 'buyer' | null>(null)
const warningMessage = ref('')

// Cancel confirmation methods
const confirmCancel = (id: string, status: 'Rejected' | 'Cancelled', type: 'farmer' | 'buyer') => {
  pendingCancelId.value = id
  pendingCancelStatus.value = status
  pendingCancelType.value = type
  
  if (type === 'farmer') {
    warningMessage.value = 'Are you sure you want to reject this buyer\'s order? This action cannot be undone and the buyer will be notified of the cancellation.'
  } else {
    warningMessage.value = 'Are you sure you want to cancel your order? This action cannot be undone and the farmer will be notified of the cancellation.'
  }
  
  showWarningModal.value = true
}

const proceedWithCancel = () => {
  if (pendingCancelId.value && pendingCancelStatus.value) {
    if (pendingCancelType.value === 'farmer') {
      emit('update-status', pendingCancelId.value, pendingCancelStatus.value as 'Rejected')
    } else {
      emit('cancel-order', pendingCancelId.value)
    }
  }
  showWarningModal.value = false
  resetCancelState()
}

const cancelCancel = () => {
  showWarningModal.value = false
  resetCancelState()
}

const resetCancelState = () => {
  pendingCancelId.value = null
  pendingCancelStatus.value = null
  pendingCancelType.value = null
  warningMessage.value = ''
}

const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric'
  })
}

const formatTime = (dateString: string): string => {
  const date = new Date(dateString)
  return date.toLocaleTimeString('en-US', { 
    hour: '2-digit',
    minute: '2-digit'
  })
}

const getStatusClasses = (status: string): string => {
  const baseClasses = 'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium'
  
  switch (status) {
    case 'Pending':
      return `${baseClasses} bg-yellow-100 text-yellow-800`
    case 'Accepted':
      return `${baseClasses} bg-blue-100 text-blue-800`
    case 'Shipped':
      return `${baseClasses} bg-purple-100 text-purple-800`
    case 'Completed':
      return `${baseClasses} bg-green-100 text-green-800`
    case 'Rejected':
      return `${baseClasses} bg-red-100 text-red-800`
    case 'Cancelled':
      return `${baseClasses} bg-gray-100 text-gray-800`
    default:
      return `${baseClasses} bg-gray-100 text-gray-800`
  }
}
</script>