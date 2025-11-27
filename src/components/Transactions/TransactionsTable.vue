<!-- components/Transactions/TransactionsTable.vue -->
<template>
  <div class="flex-1 overflow-y-auto px-4 py-3 relative">
    <!-- Decorative Background Pattern -->
    <div class="absolute inset-0 pointer-events-none overflow-hidden">
      <!-- Grid Pattern -->
      <div class="absolute inset-0 opacity-[0.02]" style="background-image: linear-gradient(#10b981 1px, transparent 1px), linear-gradient(90deg, #10b981 1px, transparent 1px); background-size: 50px 50px;"></div>
      
      <!-- Floating Decorative Elements -->
      <div class="absolute top-10 right-20 w-32 h-32 bg-gradient-to-br from-green-100/30 to-emerald-100/30 rounded-full blur-3xl animate-pulse"></div>
      <div class="absolute bottom-20 left-10 w-40 h-40 bg-gradient-to-br from-teal-100/20 to-green-100/20 rounded-full blur-3xl animate-pulse" style="animation-delay: 1.5s"></div>
      <div class="absolute top-1/3 left-1/4 w-24 h-24 bg-gradient-to-br from-emerald-100/25 to-teal-100/25 rounded-full blur-2xl animate-pulse" style="animation-delay: 0.7s"></div>
      
      <!-- Abstract Shapes -->
      <svg class="absolute top-16 left-8 w-16 h-16 text-green-200/10" viewBox="0 0 100 100" fill="currentColor">
        <circle cx="50" cy="50" r="40"/>
      </svg>
      <svg class="absolute bottom-32 right-16 w-20 h-20 text-emerald-200/10" viewBox="0 0 100 100" fill="currentColor">
        <rect x="20" y="20" width="60" height="60" rx="8"/>
      </svg>
      <svg class="absolute top-1/2 right-32 w-12 h-12 text-teal-200/10" viewBox="0 0 100 100" fill="currentColor">
        <polygon points="50,10 90,90 10,90"/>
      </svg>
    </div>

    <!-- Order Cards -->
    <div v-if="transactions.length > 0" class="space-y-3 max-w-3xl relative z-10">
      <div
        v-for="transaction in transactions"
        :key="transaction.id"
        class="group relative bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden hover:border-green-200"
      >
        <!-- Gradient top accent -->
        <div class="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        <!-- Main Content Container -->
        <div class="p-4">
          <!-- Header Section: Farmer/Buyer Info + Action Buttons -->
          <div class="flex items-start justify-between mb-4 gap-3">
            <div class="flex items-center gap-3 min-w-0 flex-1">
              <img 
                :src="getPersonInfo(transaction).avatar" 
                :alt="getPersonInfo(transaction).name"
                class="w-12 h-12 rounded-full object-cover border-2 border-green-100 flex-shrink-0 group-hover:border-green-300 transition-colors"
              />
              <div class="min-w-0 flex-1">
                <h3 class="text-sm font-bold text-gray-900 truncate group-hover:text-green-600 transition-colors">
                  {{ getPersonInfo(transaction).name }}
                </h3>
                <p v-if="getPersonInfo(transaction).farmName" class="text-xs text-gray-500 truncate">
                  {{ getPersonInfo(transaction).farmName }}
                </p>
                <p class="text-[11px] text-gray-400 mt-0.5">
                  {{ formatDate(transaction.date) }}
                </p>
              </div>
            </div>
            
            <!-- Action Buttons Group -->
            <div class="flex items-center gap-2 flex-shrink-0">
              <!-- Receipt Button -->
              <template v-if="isFarmerView">
                <button
                  @click="emit('create-receipt', transaction)"
                  class="px-3 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-md hover:shadow-lg transition-all group/btn relative flex items-center gap-1.5"
                  title="Create Online Receipt"
                >
                  <svg class="w-4 h-4 group-hover/btn:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span class="text-xs font-semibold">Receipt</span>
                </button>
              </template>

              <template v-else>
                <!-- View Receipt Button (if receipt exists) -->
                <button
                  v-if="transaction.hasReceipt"
                  @click="emit('view-receipt', transaction)"
                  class="px-3 py-2 rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-md hover:shadow-lg transition-all group/btn relative flex items-center gap-1.5"
                  title="View Receipt"
                >
                  <svg class="w-4 h-4 group-hover/btn:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  <span class="text-xs font-semibold">Receipt</span>
                  <!-- Active Badge -->
                  <div class="absolute -top-0.5 -right-0.5 w-2 h-2 bg-green-400 rounded-full border border-white animate-pulse"></div>
                </button>

                <!-- Request Receipt Button (if no receipt yet) -->
                <button
                  v-else
                  @click="emit('request-receipt', transaction)"
                  class="px-3 py-2 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-md hover:shadow-lg transition-all group/btn flex items-center gap-1.5"
                  title="Request Receipt from Farmer"
                >
                  <svg class="w-4 h-4 group-hover/btn:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <span class="text-xs font-semibold">Request</span>
                </button>
              </template>

              <!-- Chat Button -->
              <button 
                @click="emit('contact-person', transaction)"
                class="px-3 py-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-lg text-xs font-semibold shadow-md hover:shadow-lg transition-all whitespace-nowrap flex items-center gap-1.5"
              >
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                Chat
              </button>
            </div>
          </div>

          <!-- Product Section -->
          <div class="flex gap-4 mb-4 pb-4 border-b border-gray-100">
            <!-- Product Image -->
            <div 
              class="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden cursor-pointer border-2 border-gray-100 group-hover:border-green-200 transition-all shadow-sm"
              @click="emit('view-details', transaction)"
            >
              <img 
                :src="transaction.animal.images[0]" 
                :alt="transaction.animal.type"
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>

            <!-- Product Details -->
            <div class="flex-1 min-w-0">
              <h4 
                class="text-sm font-bold text-gray-900 hover:text-green-600 cursor-pointer truncate transition-colors mb-1"
                @click="emit('view-details', transaction)"
              >
                {{ transaction.animal.type }} • {{ transaction.animal.breed }}
              </h4>
              <div class="flex flex-wrap gap-2 mb-2">
                <span class="inline-flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-700 rounded-lg text-[10px] font-semibold">
                  <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M6 4a2 2 0 11-4 0 2 2 0 014 0zM16 4a2 2 0 11-4 0 2 2 0 014 0zM9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                  {{ transaction.animal.weight }}{{ transaction.animal.weightUnit }}
                </span>
                <span class="inline-flex items-center gap-1 px-2 py-1 bg-purple-50 text-purple-700 rounded-lg text-[10px] font-semibold">
                  <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5.951-1.429 5.951 1.429a1 1 0 001.169-1.409l-7-14z"/></svg>
                  {{ transaction.animal.age }}
                </span>
                <span class="inline-flex items-center gap-1 px-2 py-1 bg-pink-50 text-pink-700 rounded-lg text-[10px] font-semibold">
                  {{ transaction.animal.gender }}
                </span>
              </div>
              <p class="text-[11px] text-gray-600">
                Qty: <span class="font-semibold">{{ transaction.animal.quantity }}</span>
              </p>
            </div>

            <!-- Price Badge -->
            <div class="flex flex-col items-end justify-center gap-2 flex-shrink-0">
              <div class="text-right">
                <p class="text-2xl font-bold text-green-600">
                  ₱<span class="text-lg">{{ (transaction.amount / 1000).toFixed(1) }}k</span>
                </p>
                <p class="text-[10px] text-gray-500 mt-0.5">Total</p>
              </div>
            </div>
          </div>

          <!-- Logistics & Status Row -->
          <div class="flex items-center justify-between gap-3 mb-3 pb-3 border-b border-gray-100">
            <div class="flex items-center gap-3 text-[11px] text-gray-600 flex-wrap">
              <span class="flex items-center gap-1.5 bg-gray-50 px-2 py-1 rounded-lg">
                <svg class="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                </svg>
                <span class="font-medium">#{{ transaction.id.slice(0, 8) }}</span>
              </span>
              <span class="flex items-center gap-1.5 bg-gray-50 px-2 py-1 rounded-lg">
                <svg class="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {{ transaction.paymentMethod }}
              </span>
              <span class="flex items-center gap-1.5 bg-gray-50 px-2 py-1 rounded-lg">
                <svg class="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
                {{ transaction.deliveryMethod }}
              </span>
            </div>
            <span :class="getStatusClasses(transaction.status)" class="flex-shrink-0 whitespace-nowrap font-semibold">
              {{ getStatusLabel(transaction.status) }}
            </span>
          </div>

          <!-- Tracking Info for shipped orders -->
          <div v-if="!isFarmerView && (transaction as BuyerTransaction).trackingNumber" class="mb-3 p-3 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border border-blue-200">
            <div class="flex items-center justify-between gap-2">
              <span class="text-[11px] text-gray-700 flex items-center gap-2 min-w-0">
                <svg class="w-4 h-4 text-blue-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
                <span class="font-bold truncate">{{ (transaction as BuyerTransaction).trackingNumber }}</span>
              </span>
              <span class="text-blue-600 font-bold text-[10px] flex-shrink-0 whitespace-nowrap bg-blue-200 px-2 py-1 rounded-full">In Transit</span>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="grid grid-cols-2 gap-2">
            <template v-if="isFarmerView">
              <button 
                v-if="transaction.status === 'Pending'"
                @click="handleUpdateStatus(transaction.id, 'Accepted')"
                class="px-3 py-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-lg text-xs font-bold transition-all shadow-md hover:shadow-lg cursor-pointer"
              >
                ✓ Accept
              </button>
              <button 
                v-if="transaction.status === 'Pending'"
                @click="handleUpdateStatus(transaction.id, 'Rejected')"
                class="px-3 py-2 bg-white hover:bg-red-50 text-red-600 border-2 border-red-200 hover:border-red-300 rounded-lg text-xs font-bold transition-all cursor-pointer"
              >
                ✕ Decline
              </button>
              <button 
                v-if="transaction.status !== 'Pending'"
                @click="emit('view-details', transaction)"
                class="col-span-2 px-3 py-2 bg-gradient-to-r from-gray-100 to-gray-50 hover:from-gray-200 hover:to-gray-100 text-gray-700 rounded-lg text-xs font-bold transition-all cursor-pointer border border-gray-200"
              >
                View Details
              </button>
            </template>

            <template v-if="!isFarmerView">
              <button 
                v-if="transaction.status === 'Shipped'"
                @click="emit('confirm-delivery', transaction.id)"
                class="col-span-2 px-3 py-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-lg text-xs font-bold transition-all shadow-md hover:shadow-lg cursor-pointer"
              >
                📦 Order Received
              </button>
              <button 
                v-if="transaction.status === 'Pending' || transaction.status === 'Accepted'"
                @click="handleCancelOrder(transaction.id)"
                class="px-3 py-2 bg-white hover:bg-red-50 text-red-600 border-2 border-red-200 hover:border-red-300 rounded-lg text-xs font-bold transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button 
                v-if="transaction.status === 'Completed'"
                class="px-3 py-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-lg text-xs font-bold transition-all shadow-md hover:shadow-lg cursor-pointer"
              >
                🔁 Buy Again
              </button>
              <button 
                @click="emit('view-details', transaction)"
                class="px-3 py-2 bg-gradient-to-r from-gray-100 to-gray-50 hover:from-gray-200 hover:to-gray-100 text-gray-700 rounded-lg text-xs font-bold transition-all cursor-pointer border border-gray-200"
              >
                View Details
              </button>
            </template>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else class="max-w-3xl bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center relative z-10">
      <div class="w-20 h-20 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
        <svg class="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
        </svg>
      </div>
      <h3 class="text-lg font-bold text-gray-900 mb-2">No Orders Found</h3>
      <p class="text-sm text-gray-600 mb-6">
        {{ isFarmerView 
          ? 'You don\'t have any transactions yet. Your sales will appear here.' 
          : 'You haven\'t placed any orders yet. Start shopping for livestock!'
        }}
      </p>
      <button 
        v-if="!isFarmerView"
        @click="emit('reset-filters')"
        class="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-lg text-sm font-bold transition-all shadow-lg hover:shadow-xl cursor-pointer"
      >
        Browse Marketplace
      </button>
    </div>

    <!-- Confirmation Modal -->
    <div v-if="showConfirmModal" class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl transform transition-all animate-in">
        <div class="flex items-center justify-center w-12 h-12 rounded-full bg-red-100 mx-auto mb-4">
          <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-1.964-1.333-2.732 0L3.35 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h3 class="text-lg font-bold text-gray-900 mb-2 text-center">{{ confirmTitle }}</h3>
        <p class="text-sm text-gray-600 mb-6 text-center">{{ confirmMessage }}</p>

        <div class="flex gap-3">
          <button 
            @click="proceedAction"
            class="flex-1 px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-bold transition-colors shadow-md cursor-pointer"
          >
            {{ confirmButtonText }}
          </button>
          <button 
            @click="cancelAction"
            class="flex-1 px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-bold transition-colors cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Transaction, FarmerTransaction, BuyerTransaction } from '@/types/transactionTypes'

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
  'contact-person': [transaction: Transaction]
  'create-receipt': [transaction: Transaction]
  'view-receipt': [transaction: Transaction]
  'request-receipt': [transaction: Transaction]
  'reset-filters': []
}>()

const showConfirmModal = ref(false)
const pendingAction = ref<(() => void) | null>(null)
const confirmTitle = ref('')
const confirmMessage = ref('')
const confirmButtonText = ref('')

const handleUpdateStatus = (id: string, status: 'Accepted' | 'Rejected') => {
  if (status === 'Rejected') {
    confirmTitle.value = 'Decline Order'
    confirmMessage.value = 'Are you sure you want to decline this order? The buyer will be notified.'
    confirmButtonText.value = 'Yes, Decline'
    pendingAction.value = () => emit('update-status', id, status)
    showConfirmModal.value = true
  } else {
    emit('update-status', id, status)
  }
}

const handleCancelOrder = (id: string) => {
  confirmTitle.value = 'Cancel Order'
  confirmMessage.value = 'Are you sure you want to cancel this order? This action cannot be undone.'
  confirmButtonText.value = 'Yes, Cancel Order'
  pendingAction.value = () => emit('cancel-order', id)
  showConfirmModal.value = true
}

const proceedAction = () => {
  if (pendingAction.value) {
    pendingAction.value()
  }
  showConfirmModal.value = false
  pendingAction.value = null
}

const cancelAction = () => {
  showConfirmModal.value = false
  pendingAction.value = null
}

const getPersonInfo = (transaction: Transaction) => {
  if ('buyer' in transaction) {
    return {
      name: transaction.buyer.name,
      avatar: transaction.buyer.avatar || 'https://via.placeholder.com/40',
      farmName: transaction.buyer.farm
    }
  } else {
    return {
      name: transaction.farmer.name,
      avatar: transaction.farmer.avatar,
      farmName: transaction.farmer.farmName
    }
  }
}

const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric',
    year: 'numeric'
  })
}

const getStatusLabel = (status: string): string => {
  const labels: Record<string, string> = {
    'Pending': 'To Pay',
    'Accepted': 'To Ship',
    'Shipped': 'To Receive',
    'Completed': 'Completed',
    'Rejected': 'Declined',
    'Cancelled': 'Cancelled'
  }
  return labels[status] || status
}

const getStatusClasses = (status: string): string => {
  const baseClasses = 'px-3 py-1 rounded-full text-[10px]'
  
  switch (status) {
    case 'Pending':
      return `${baseClasses} bg-yellow-100 text-yellow-700 border border-yellow-300`
    case 'Accepted':
      return `${baseClasses} bg-blue-100 text-blue-700 border border-blue-300`
    case 'Shipped':
      return `${baseClasses} bg-purple-100 text-purple-700 border border-purple-300`
    case 'Completed':
      return `${baseClasses} bg-green-100 text-green-700 border border-green-300`
    case 'Rejected':
    case 'Cancelled':
      return `${baseClasses} bg-gray-100 text-gray-700 border border-gray-300`
    default:
      return `${baseClasses} bg-gray-100 text-gray-700 border border-gray-300`
  }
}
</script>