<!-- InfoModal.vue -->
<template>
  <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center p-4">
    <!-- Backdrop -->
    <div 
      class="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300" 
      @click="$emit('close')"
    ></div>
    
    <!-- Modal -->
    <div class="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full transform transition-all duration-300">
      <!-- Header -->
      <div class="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-6 rounded-t-2xl">
        <div class="flex justify-between items-start">
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h2 class="text-2xl font-bold">Transaction Views</h2>
          </div>
          <button 
            @click="$emit('close')" 
            class="text-white hover:bg-white/20 rounded-lg p-2 transition-colors"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Content -->
      <div class="p-6">
        <div class="space-y-6">
          <!-- Farmer View Info -->
          <div class="bg-green-50 rounded-xl p-5 border-2 border-green-200">
            <div class="flex items-start gap-4">
              <div class="flex-shrink-0">
                <div class="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                </div>
              </div>
              <div class="flex-1">
                <h3 class="font-bold text-green-700 mb-2 text-lg flex items-center gap-2">
                  👨‍🌾 My Sales (Farmer View)
                </h3>
                <p class="text-sm text-gray-700 leading-relaxed">
                  View and manage buyer inquiries and completed sales. Accept or reject purchase requests from buyers interested in your livestock. Track your earnings and transaction history.
                </p>
                <div class="mt-3 flex flex-wrap gap-2">
                  <span class="px-3 py-1 bg-white rounded-full text-xs font-semibold text-green-700 border border-green-200">
                    Accept/Reject Orders
                  </span>
                  <span class="px-3 py-1 bg-white rounded-full text-xs font-semibold text-green-700 border border-green-200">
                    Track Earnings
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- Buyer View Info -->
          <div class="bg-blue-50 rounded-xl p-5 border-2 border-blue-200">
            <div class="flex items-start gap-4">
              <div class="flex-shrink-0">
                <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                  <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
              </div>
              <div class="flex-1">
                <h3 class="font-bold text-blue-700 mb-2 text-lg flex items-center gap-2">
                  🛒 My Purchases (Buyer View)
                </h3>
                <p class="text-sm text-gray-700 leading-relaxed">
                  Track your livestock orders and purchases. View order status, delivery information, and confirm deliveries. Monitor your spending and purchase history.
                </p>
                <div class="mt-3 flex flex-wrap gap-2">
                  <span class="px-3 py-1 bg-white rounded-full text-xs font-semibold text-blue-700 border border-blue-200">
                    Track Orders
                  </span>
                  <span class="px-3 py-1 bg-white rounded-full text-xs font-semibold text-blue-700 border border-blue-200">
                    Confirm Delivery
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- Role-based Access Info -->
          <div v-if="currentUserRole === 'farmer' || currentUserRole === 'admin'" class="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-200">
            <div class="flex items-start gap-3">
              <svg class="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <p class="text-sm text-gray-700">
                  <span class="font-semibold text-purple-700">Note:</span> As a {{ currentUserRole }}, you can switch between both views using the tabs above to manage your sales and purchases.
                </p>
              </div>
            </div>
          </div>

          <!-- Transaction Status Legend -->
          <div class="bg-gray-50 rounded-xl p-5 border border-gray-200">
            <h4 class="font-bold text-gray-800 mb-3 flex items-center gap-2">
              <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Transaction Statuses
            </h4>
            <div class="space-y-2">
              <div class="flex items-center gap-2">
                <span class="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-bold">Pending</span>
                <span class="text-sm text-gray-600">Awaiting response</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-bold">Accepted</span>
                <span class="text-sm text-gray-600">Order confirmed</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-bold">Shipped</span>
                <span class="text-sm text-gray-600">In transit</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-bold">Completed</span>
                <span class="text-sm text-gray-600">Transaction finished</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-bold">Rejected/Cancelled</span>
                <span class="text-sm text-gray-600">Transaction ended</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Close Button -->
        <div class="mt-6">
          <button
            @click="$emit('close')"
            class="w-full px-4 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-lg font-semibold transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            Got it!
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  show: boolean
  currentUserRole: string
}

defineProps<Props>()

defineEmits<{
  close: []
}>()
</script>