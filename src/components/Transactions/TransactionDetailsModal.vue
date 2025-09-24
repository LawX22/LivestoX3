<template>
  <div v-if="transaction" class="fixed inset-0 overflow-hidden z-50">
    <div class="absolute inset-0 overflow-hidden">
      <!-- Non-blurred background overlay with pointer-events-none for background visibility -->
      <div class="absolute inset-0 bg-black/20 pointer-events-none"></div>
      <!-- Clickable overlay only on the left side to close modal -->
      <div class="absolute inset-0 pointer-events-auto" @click="closeModalIfClickedOutside"></div>
      
      <!-- Modal positioned on the right -->
      <div class="fixed inset-y-0 right-0 pl-10 max-w-full flex pointer-events-none">
        <div class="w-screen max-w-md pointer-events-auto">
          <div class="h-full flex flex-col bg-white shadow-xl overflow-y-scroll">
            <div class="flex-1 py-6 overflow-y-auto px-4 sm:px-6">
              <div class="flex items-start justify-between">
                <h2 class="text-lg font-medium text-gray-900">Transaction Details</h2>
                <div class="ml-3 h-7 flex items-center">
                  <button 
                    @click="$emit('close')"
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
                      <div class="flex-shrink-0 h-20 w-20 rounded-xl overflow-hidden border border-gray-200">
                        <img :src="transaction.livestock.image" class="h-full w-full object-cover">
                      </div>
                      <div class="ml-4 flex-1">
                        <div>
                          <div class="flex justify-between text-base font-medium text-gray-900">
                            <h3>{{ transaction.livestock.type }} ({{ transaction.livestock.breed }})</h3>
                            <p class="ml-4 bg-green-100 text-green-800 px-2 py-0.5 rounded-md text-sm">
                              ₱{{ transaction.amount.toLocaleString() }}
                            </p>
                          </div>
                          <p class="mt-1 text-sm text-gray-500">{{ transaction.livestock.description }}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div class="py-6 border-b border-gray-200">
                    <h3 class="text-lg font-medium text-gray-900 mb-4">Buyer Information</h3>
                    <div class="flex items-start">
                      <div class="flex-shrink-0">
                        <img class="h-12 w-12 rounded-full border border-gray-200" :src="transaction.buyer.avatar" alt="">
                      </div>
                      <div class="ml-4">
                        <h4 class="text-sm font-medium text-gray-900">{{ transaction.buyer.name }}</h4>
                        <p class="text-sm text-gray-500">{{ transaction.buyer.contact }}</p>
                        <p class="text-sm text-gray-500">{{ transaction.buyer.address }}</p>
                      </div>
                    </div>
                  </div>

                  <div class="py-6 border-b border-gray-200">
                    <h3 class="text-lg font-medium text-gray-900 mb-4">Transaction Details</h3>
                    <dl class="space-y-4">
                      <div class="flex items-center justify-between">
                        <dt class="text-sm text-gray-600">Transaction ID</dt>
                        <dd class="text-sm font-medium text-gray-900">{{ transaction.id }}</dd>
                      </div>
                      <div class="flex items-center justify-between">
                        <dt class="text-sm text-gray-600">Date</dt>
                        <dd class="text-sm font-medium text-gray-900">{{ formatDate(transaction.date) }}</dd>
                      </div>
                      <div class="flex items-center justify-between">
                        <dt class="text-sm text-gray-600">Status</dt>
                        <dd class="text-sm font-medium text-gray-900">
                          <span :class="`px-3 py-1 inline-flex text-xs leading-4 font-semibold rounded-full ${getStatusClass(transaction.status)}`">
                            {{ transaction.status }}
                          </span>
                        </dd>
                      </div>
                      <div class="flex items-center justify-between">
                        <dt class="text-sm text-gray-600">Payment Method</dt>
                        <dd class="text-sm font-medium text-gray-900">{{ transaction.paymentMethod }}</dd>
                      </div>
                      <div class="flex items-center justify-between">
                        <dt class="text-sm text-gray-600">Delivery Method</dt>
                        <dd class="text-sm font-medium text-gray-900">{{ transaction.deliveryMethod }}</dd>
                      </div>
                    </dl>
                  </div>

                  <div class="py-6">
                    <h3 class="text-lg font-medium text-gray-900 mb-4">Buyer's Message</h3>
                    <div class="bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <p class="text-sm text-gray-700">{{ transaction.message || "No message provided by the buyer." }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="border-t border-gray-200 px-4 py-6 sm:px-6">
              <div class="flex justify-between text-base font-medium text-gray-900 mb-2">
                <p>Total</p>
                <p>₱{{ transaction.amount.toLocaleString() }}</p>
              </div>
              <p class="mt-0.5 text-sm text-gray-500 mb-4">Shipping and taxes calculated at checkout.</p>
              <div class="flex space-x-3">
                <button 
                  v-if="transaction.status === 'Pending'"
                  @click="$emit('update-status', transaction.id, 'Accepted')"
                  class="flex-1 bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 text-white rounded-md py-2.5 px-4 flex items-center justify-center text-sm font-medium transition-all shadow hover:shadow-md"
                >
                  Accept Offer
                </button>
                <button 
                  v-if="transaction.status === 'Pending'"
                  @click="$emit('update-status', transaction.id, 'Rejected')"
                  class="flex-1 bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-800 rounded-md py-2.5 px-4 flex items-center justify-center text-sm font-medium transition-all shadow hover:shadow-md border border-gray-300"
                >
                  Reject Offer
                </button>
                <button 
                  v-if="transaction.status !== 'Pending'"
                  @click="$emit('close')"
                  class="flex-1 bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-800 rounded-md py-2.5 px-4 flex items-center justify-center text-sm font-medium transition-all shadow hover:shadow-md border border-gray-300"
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

interface Props {
  transaction: Transaction | null
}

interface Emits {
  (e: 'close'): void
  (e: 'update-status', id: string, status: 'Accepted' | 'Rejected'): void
}

defineProps<Props>()
const emit = defineEmits<Emits>()

const closeModalIfClickedOutside = (event: Event) => {
  if (event.target === event.currentTarget) {
    emit('close')
  }
}

const formatDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' }
  return new Date(dateString).toLocaleDateString(undefined, options)
}

const getStatusClass = (status: string): string => {
  switch (status) {
    case 'Pending': return 'bg-yellow-100 text-yellow-800 border-yellow-300'
    case 'Accepted': return 'bg-blue-100 text-blue-800 border-blue-300'
    case 'Completed': return 'bg-green-100 text-green-800 border-green-300'
    case 'Rejected': return 'bg-red-100 text-red-800 border-red-300'
    default: return 'bg-gray-100 text-gray-800 border-gray-300'
  }
}
</script>