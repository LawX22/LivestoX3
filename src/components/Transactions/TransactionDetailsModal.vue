<!-- components/Transactions/TransactionDetailsModal.vue -->
<template>
  <div v-if="transaction" class="fixed inset-0 overflow-hidden z-50">
    <div class="absolute inset-0 overflow-hidden">
      <div class="absolute inset-0 bg-black/40 transition-opacity" @click="emit('close')"></div>
      
      <div class="fixed inset-y-0 right-0 pl-10 max-w-full flex pointer-events-none">
        <div class="w-screen max-w-md pointer-events-auto">
          <div class="h-full flex flex-col bg-white shadow-2xl">
            <!-- Header -->
            <div class="px-6 py-4 bg-white border-b sticky top-0 z-10">
              <div class="flex items-center justify-between">
                <h2 class="text-lg font-bold text-gray-900">Order Details</h2>
                <button 
                  @click="emit('close')"
                  class="p-2 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <!-- Content -->
            <div class="flex-1 overflow-y-auto">
              <!-- Order Status Timeline -->
              <div class="px-6 py-4 bg-gray-50 border-b">
                <div class="flex items-center justify-between mb-2">
                  <span class="text-sm font-medium text-gray-700">Order Status</span>
                  <span :class="getStatusClasses(transaction.status)">
                    {{ transaction.status }}
                  </span>
                </div>
                
                <!-- Progress Steps -->
                <div class="relative">
                  <div class="absolute top-4 left-0 right-0 h-0.5 bg-gray-200"></div>
                  <div class="relative flex justify-between">
                    <div v-for="(step, index) in getOrderSteps()" :key="step.label" class="flex flex-col items-center">
                      <div :class="[
                        'w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all z-10',
                        step.completed ? 'bg-orange-500 text-white' : 'bg-white border-2 border-gray-300 text-gray-400'
                      ]">
                        <svg v-if="step.completed" class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                        </svg>
                        <span v-else>{{ index + 1 }}</span>
                      </div>
                      <span class="text-xs text-gray-600 mt-2 text-center w-16">{{ step.label }}</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Product Information -->
              <div class="px-6 py-4 border-b">
                <h3 class="text-sm font-semibold text-gray-900 mb-3">Product Details</h3>
                <div class="flex gap-4">
                  <img 
                    :src="transaction.animal.images[0]" 
                    :alt="transaction.animal.type"
                    class="w-20 h-20 rounded-lg object-cover border"
                  />
                  <div class="flex-1">
                    <h4 class="text-sm font-medium text-gray-900">
                      {{ transaction.animal.type }} - {{ transaction.animal.breed }}
                    </h4>
                    <p class="text-xs text-gray-500 mt-1">
                      {{ transaction.animal.weight }}{{ transaction.animal.weightUnit }} • 
                      {{ transaction.animal.age }} • 
                      {{ transaction.animal.gender }}
                    </p>
                    <p class="text-xs text-gray-500 mt-1">Quantity: {{ transaction.animal.quantity }}</p>
                    <p class="text-lg font-bold text-orange-500 mt-2">₱{{ transaction.amount.toLocaleString() }}</p>
                  </div>
                </div>
              </div>

              <!-- Person Information -->
              <div class="px-6 py-4 border-b">
                <h3 class="text-sm font-semibold text-gray-900 mb-3">
                  {{ isFarmerView ? 'Buyer Information' : 'Farmer Information' }}
                </h3>
                <div class="flex items-start gap-3">
                  <img 
                    :src="getPersonData(transaction).avatar" 
                    :alt="getPersonData(transaction).name"
                    class="w-12 h-12 rounded-full object-cover border"
                  />
                  <div>
                    <h4 class="text-sm font-medium text-gray-900">{{ getPersonData(transaction).name }}</h4>
                    <p v-if="getPersonData(transaction).farmName" class="text-xs text-gray-500">
                      {{ getPersonData(transaction).farmName }}
                    </p>
                    <p class="text-xs text-gray-500 mt-1">{{ getPersonData(transaction).contact }}</p>
                  </div>
                </div>
              </div>

              <!-- Order Information -->
              <div class="px-6 py-4 border-b">
                <h3 class="text-sm font-semibold text-gray-900 mb-3">Order Information</h3>
                <div class="space-y-2">
                  <div class="flex justify-between text-sm">
                    <span class="text-gray-600">Order ID</span>
                    <span class="font-medium text-gray-900">{{ transaction.id }}</span>
                  </div>
                  <div class="flex justify-between text-sm">
                    <span class="text-gray-600">Order Date</span>
                    <span class="font-medium text-gray-900">{{ formatDate(transaction.date) }}</span>
                  </div>
                  <div class="flex justify-between text-sm">
                    <span class="text-gray-600">Payment Method</span>
                    <span class="font-medium text-gray-900">{{ transaction.paymentMethod }}</span>
                  </div>
                  <div class="flex justify-between text-sm">
                    <span class="text-gray-600">Delivery Method</span>
                    <span class="font-medium text-gray-900">{{ transaction.deliveryMethod }}</span>
                  </div>
                  
                  <template v-if="!isFarmerView && getBuyerTransaction(transaction)">
                    <div v-if="getBuyerTransaction(transaction)?.trackingNumber" class="flex justify-between text-sm">
                      <span class="text-gray-600">Tracking Number</span>
                      <span class="font-medium text-blue-600">{{ getBuyerTransaction(transaction)?.trackingNumber }}</span>
                    </div>
                    <div v-if="getBuyerTransaction(transaction)?.estimatedDelivery" class="flex justify-between text-sm">
                      <span class="text-gray-600">Estimated Delivery</span>
                      <span class="font-medium text-gray-900">{{ formatDate(getBuyerTransaction(transaction)?.estimatedDelivery || '') }}</span>
                    </div>
                  </template>
                </div>
              </div>

              <!-- Message -->
              <div v-if="transaction.message" class="px-6 py-4 border-b">
                <h3 class="text-sm font-semibold text-gray-900 mb-2">
                  {{ isFarmerView ? "Buyer's Message" : "Your Message" }}
                </h3>
                <div class="bg-gray-50 rounded-lg p-3">
                  <p class="text-sm text-gray-700">{{ transaction.message }}</p>
                </div>
              </div>

              <!-- Order Summary -->
              <div class="px-6 py-4 bg-gray-50">
                <h3 class="text-sm font-semibold text-gray-900 mb-3">Order Summary</h3>
                <div class="space-y-2">
                  <div class="flex justify-between text-sm">
                    <span class="text-gray-600">Subtotal</span>
                    <span class="text-gray-900">₱{{ transaction.amount.toLocaleString() }}</span>
                  </div>
                  <div class="flex justify-between text-sm">
                    <span class="text-gray-600">Shipping Fee</span>
                    <span class="text-gray-900">₱0</span>
                  </div>
                  <div class="flex justify-between text-base font-bold pt-2 border-t">
                    <span class="text-gray-900">Total</span>
                    <span class="text-orange-500">₱{{ transaction.amount.toLocaleString() }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Footer Actions -->
            <div class="px-6 py-4 bg-white border-t sticky bottom-0">
              <div class="flex gap-3">
                <template v-if="isFarmerView">
                  <button 
                    v-if="transaction.status === 'Pending'"
                    @click="emit('update-status', transaction.id, 'Accepted')"
                    class="flex-1 px-4 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors cursor-pointer"
                  >
                    Accept Order
                  </button>
                  <button 
                    v-if="transaction.status === 'Pending'"
                    @click="emit('update-status', transaction.id, 'Rejected')"
                    class="flex-1 px-4 py-3 bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 rounded-lg font-medium transition-colors cursor-pointer"
                  >
                    Decline
                  </button>
                </template>

                <template v-else>
                  <button 
                    v-if="transaction.status === 'Shipped'"
                    @click="emit('confirm-delivery', transaction.id)"
                    class="flex-1 px-4 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors cursor-pointer"
                  >
                    Confirm Received
                  </button>
                  <button 
                    v-if="transaction.status === 'Pending' || transaction.status === 'Accepted'"
                    @click="emit('cancel-order', transaction.id)"
                    class="flex-1 px-4 py-3 bg-white hover:bg-gray-50 text-red-600 border border-red-300 rounded-lg font-medium transition-colors cursor-pointer"
                  >
                    Cancel Order
                  </button>
                </template>
                
                <button 
                  @click="emit('close')"
                  class="px-6 py-3 bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 rounded-lg font-medium transition-colors cursor-pointer"
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
</template>

<script setup lang="ts">
import type { Transaction, FarmerTransaction, BuyerTransaction } from '@/types/transactionTypes'

interface Props {
  transaction: Transaction | null
  isFarmerView: boolean
}

const { transaction, isFarmerView } = defineProps<Props>()

const emit = defineEmits<{
  close: []
  'update-status': [id: string, status: 'Accepted' | 'Rejected']
  'cancel-order': [id: string]
  'confirm-delivery': [id: string]
}>()

const getPersonData = (transaction: Transaction) => {
  if ('buyer' in transaction) {
    return {
      name: transaction.buyer.name,
      contact: transaction.buyer.contact,
      address: transaction.buyer.address,
      avatar: transaction.buyer.avatar || 'https://via.placeholder.com/48',
      farmName: transaction.buyer.farm
    }
  } else {
    return {
      name: transaction.farmer.name,
      contact: transaction.farmer.contact,
      farmName: transaction.farmer.farmName,
      avatar: transaction.farmer.avatar,
      address: transaction.farmer.address
    }
  }
}

const getBuyerTransaction = (transaction: Transaction): BuyerTransaction | null => {
  return 'farmer' in transaction ? transaction : null
}

const getOrderSteps = () => {
  const status = (transaction as Transaction).status
  
  const steps = [
    { label: 'Order Placed', completed: true },
    { label: 'Processing', completed: ['Accepted', 'Shipped', 'Completed'].includes(status) },
    { label: 'Shipped', completed: ['Shipped', 'Completed'].includes(status) },
    { label: 'Delivered', completed: status === 'Completed' }
  ]
  
  return steps
}

const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric'
  })
}

const getStatusClasses = (status: string): string => {
  const baseClasses = 'px-3 py-1 rounded-full text-xs font-medium'
  
  switch (status) {
    case 'Pending': return `${baseClasses} bg-yellow-100 text-yellow-800`
    case 'Accepted': return `${baseClasses} bg-blue-100 text-blue-800`
    case 'Shipped': return `${baseClasses} bg-purple-100 text-purple-800`
    case 'Completed': return `${baseClasses} bg-green-100 text-green-800`
    case 'Rejected':
    case 'Cancelled': return `${baseClasses} bg-gray-100 text-gray-800`
    default: return `${baseClasses} bg-gray-100 text-gray-800`
  }
}
</script>