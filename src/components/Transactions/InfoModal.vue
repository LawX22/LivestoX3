  <!-- InfoModal.vue -->
<template>
  <div v-if="show" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
    <div class="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-hidden transform transition-all duration-300 ease-out">
      <!-- Header -->
      <div class="bg-gradient-to-r from-green-500 to-emerald-600 p-6 text-white">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h2 class="text-xl font-bold">Understanding Transaction Views</h2>
              <p class="text-green-100 text-sm opacity-90">Learn about My Sales vs My Purchases</p>
            </div>
          </div>
          <button 
            @click="$emit('close')"
            class="p-2 hover:bg-white/20 rounded-full transition-colors duration-200"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Content -->
      <div class="p-6 overflow-y-auto">
        <div class="space-y-6">
          <!-- My Sales Section -->
          <div class="bg-green-50 border border-green-200 rounded-xl p-4">
            <div class="flex items-center gap-3 mb-3">
              <div class="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>
              <h3 class="font-bold text-green-800">My Sales (Farmer View)</h3>
            </div>
            <div class="space-y-2 text-sm text-gray-700">
              <div class="flex items-start gap-2">
                <div class="w-1.5 h-1.5 bg-green-400 rounded-full mt-1.5 flex-shrink-0"></div>
                <span>Transactions where <strong>you are the seller</strong></span>
              </div>
              <div class="flex items-start gap-2">
                <div class="w-1.5 h-1.5 bg-green-400 rounded-full mt-1.5 flex-shrink-0"></div>
                <span>Manage buyer inquiries and orders for your livestock</span>
              </div>
              <div class="flex items-start gap-2">
                <div class="w-1.5 h-1.5 bg-green-400 rounded-full mt-1.5 flex-shrink-0"></div>
                <span>Accept or reject purchase requests from buyers</span>
              </div>
              <div class="flex items-start gap-2">
                <div class="w-1.5 h-1.5 bg-green-400 rounded-full mt-1.5 flex-shrink-0"></div>
                <span>Track completed sales and earnings</span>
              </div>
              <div class="flex items-start gap-2">
                <div class="w-1.5 h-1.5 bg-green-400 rounded-full mt-1.5 flex-shrink-0"></div>
                <span><strong>Available to:</strong> Farmers and Administrators</span>
              </div>
            </div>
          </div>

          <!-- My Purchases Section -->
          <div class="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <div class="flex items-center gap-3 mb-3">
              <div class="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <h3 class="font-bold text-blue-800">My Purchases (Buyer View)</h3>
            </div>
            <div class="space-y-2 text-sm text-gray-700">
              <div class="flex items-start gap-2">
                <div class="w-1.5 h-1.5 bg-blue-400 rounded-full mt-1.5 flex-shrink-0"></div>
                <span>Transactions where <strong>you are the buyer</strong></span>
              </div>
              <div class="flex items-start gap-2">
                <div class="w-1.5 h-1.5 bg-blue-400 rounded-full mt-1.5 flex-shrink-0"></div>
                <span>Track orders you've placed with farmers</span>
              </div>
              <div class="flex items-start gap-2">
                <div class="w-1.5 h-1.5 bg-blue-400 rounded-full mt-1.5 flex-shrink-0"></div>
                <span>Monitor order status: Pending, Accepted, Shipped, Completed</span>
              </div>
              <div class="flex items-start gap-2">
                <div class="w-1.5 h-1.5 bg-blue-400 rounded-full mt-1.5 flex-shrink-0"></div>
                <span>Cancel orders (if allowed) and confirm deliveries</span>
              </div>
              <div class="flex items-start gap-2">
                <div class="w-1.5 h-1.5 bg-blue-400 rounded-full mt-1.5 flex-shrink-0"></div>
                <span><strong>Available to:</strong> All users (Farmers, Buyers, Administrators)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  show: boolean
}>()

defineEmits<{
  close: []
}>()
</script>