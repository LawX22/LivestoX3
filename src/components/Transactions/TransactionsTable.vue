<!-- components/Transactions/TransactionsTable.vue - FIXED ROUTER NAVIGATION & LISTING ID -->
<template>
  <div class="flex-1 overflow-y-auto px-4 py-3 relative">
    <!-- Decorative Background Pattern -->
    <div class="absolute inset-0 pointer-events-none overflow-hidden">
      <div class="absolute inset-0 opacity-[0.02]" style="background-image: linear-gradient(#10b981 1px, transparent 1px), linear-gradient(90deg, #10b981 1px, transparent 1px); background-size: 50px 50px;"></div>
      <div class="absolute top-10 right-20 w-32 h-32 bg-gradient-to-br from-green-100/30 to-emerald-100/30 rounded-full blur-3xl animate-pulse"></div>
      <div class="absolute bottom-20 left-10 w-40 h-40 bg-gradient-to-br from-teal-100/20 to-green-100/20 rounded-full blur-3xl animate-pulse" style="animation-delay: 1.5s"></div>
      <div class="absolute top-1/3 left-1/4 w-24 h-24 bg-gradient-to-br from-emerald-100/25 to-teal-100/25 rounded-full blur-2xl animate-pulse" style="animation-delay: 0.7s"></div>
    </div>

    <!-- Order Cards -->
    <div v-if="transactions.length > 0" class="space-y-3 max-w-3xl relative z-10">
      <div
        v-for="transaction in transactions"
        :key="transaction.id"
        :class="[
          'group relative rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden',
          transaction.status === 'Cancelled' || transaction.status === 'Rejected'
            ? 'bg-red-50 border-2 border-red-300 hover:border-red-400'
            : 'bg-white border border-gray-100 hover:border-green-200'
        ]"
      >
        <!-- Top Gradient Bar -->
        <div :class="[
          'absolute top-0 left-0 right-0 h-1 transition-opacity duration-300',
          transaction.status === 'Cancelled' || transaction.status === 'Rejected'
            ? 'bg-gradient-to-r from-red-500 via-red-600 to-red-700 opacity-100'
            : 'bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 opacity-0 group-hover:opacity-100'
        ]"></div>

        <div class="p-4">
          <!-- Header Section -->
          <div class="flex items-start justify-between mb-4 gap-3">
            <div class="flex items-center gap-3 min-w-0 flex-1">
              <img 
                :src="getPersonInfo(transaction).avatar" 
                :alt="getPersonInfo(transaction).name"
                :class="[
                  'w-12 h-12 rounded-full object-cover border-2 flex-shrink-0 transition-colors',
                  transaction.status === 'Cancelled' || transaction.status === 'Rejected'
                    ? 'border-red-300 opacity-75'
                    : 'border-green-100 group-hover:border-green-300'
                ]"
              />
              <div class="min-w-0 flex-1">
                <h3 :class="[
                  'text-sm font-bold truncate transition-colors',
                  transaction.status === 'Cancelled' || transaction.status === 'Rejected'
                    ? 'text-red-900'
                    : 'text-gray-900 group-hover:text-green-600'
                ]">
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
                  <div class="absolute -top-0.5 -right-0.5 w-2 h-2 bg-green-400 rounded-full border border-white animate-pulse"></div>
                </button>

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

              <button 
                @click="handleChatWithPerson(transaction)"
                :disabled="isStartingChat"
                :class="[
                  'px-3 py-2 rounded-lg text-xs font-semibold shadow-md hover:shadow-lg transition-all whitespace-nowrap flex items-center gap-1.5',
                  isStartingChat 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white cursor-pointer'
                ]"
              >
                <svg 
                  v-if="isStartingChat" 
                  class="w-3.5 h-3.5 animate-spin" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <svg 
                  v-else
                  class="w-3.5 h-3.5" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                {{ isStartingChat ? 'Starting...' : 'Chat' }}
              </button>
            </div>
          </div>

          <!-- Cancelled/Rejected Banner -->
          <div 
            v-if="transaction.status === 'Cancelled' || transaction.status === 'Rejected'"
            class="mb-4 p-3 bg-red-100 border-2 border-red-300 rounded-lg flex items-center gap-3"
          >
            <div class="flex-shrink-0 w-10 h-10 bg-red-200 rounded-full flex items-center justify-center">
              <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <div class="flex-1">
              <p class="text-sm font-bold text-red-900">
                {{ transaction.status === 'Cancelled' ? 'Order Cancelled' : 'Order Declined' }}
              </p>
              <p class="text-xs text-red-700 mt-0.5">
                {{ transaction.status === 'Cancelled' 
                  ? 'This order has been cancelled' 
                  : 'This order was declined by the farmer'
                }}
              </p>
            </div>
          </div>

          <!-- Product Section -->
          <div :class="[
            'flex gap-4 mb-4 pb-4 border-b',
            transaction.status === 'Cancelled' || transaction.status === 'Rejected'
              ? 'border-red-200 opacity-75'
              : 'border-gray-100'
          ]">
            <div 
              :class="[
                'w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden cursor-pointer border-2 transition-all shadow-sm',
                transaction.status === 'Cancelled' || transaction.status === 'Rejected'
                  ? 'border-red-200 opacity-75'
                  : 'border-gray-100 group-hover:border-green-200'
              ]"
              @click="emit('view-details', transaction)"
            >
              <img 
                :src="transaction.animal.images[0]" 
                :alt="transaction.animal.type"
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>

            <div class="flex-1 min-w-0">
              <h4 
                :class="[
                  'text-sm font-bold hover:text-green-600 cursor-pointer truncate transition-colors mb-1',
                  transaction.status === 'Cancelled' || transaction.status === 'Rejected'
                    ? 'text-red-900'
                    : 'text-gray-900'
                ]"
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
              <p class="text-[11px] text-gray-600 mb-1">
                Qty: <span class="font-semibold">{{ transaction.animal.quantity }}</span> × 
                ₱{{ transaction.animal.price.toLocaleString() }}
              </p>
              <p class="text-xs text-gray-500">
                Unit Price: ₱{{ transaction.animal.price.toLocaleString() }}/{{ transaction.animal.priceUnit }}
              </p>
            </div>

            <div class="flex flex-col items-end justify-center gap-2 flex-shrink-0">
              <div class="text-right">
                <p :class="[
                  'text-2xl font-bold',
                  transaction.status === 'Cancelled' || transaction.status === 'Rejected'
                    ? 'text-red-600 line-through opacity-75'
                    : 'text-green-600'
                ]">
                  ₱{{ transaction.amount.toLocaleString() }}
                </p>
                <p class="text-[10px] text-gray-500 mt-0.5">Total</p>
              </div>
            </div>
          </div>

          <!-- Logistics & Status Row -->
          <div :class="[
            'flex items-center justify-between gap-3 mb-3 pb-3 border-b',
            transaction.status === 'Cancelled' || transaction.status === 'Rejected'
              ? 'border-red-200 opacity-75'
              : 'border-gray-100'
          ]">
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
              <span :class="[
                'flex items-center gap-1.5 px-2 py-1 rounded-lg font-semibold',
                transaction.deliveryMethod === 'pickup' ? 'bg-purple-50 text-purple-700' : 'bg-blue-50 text-blue-700'
              ]">
                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path v-if="transaction.deliveryMethod === 'pickup'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
                {{ transaction.deliveryMethod === 'pickup' ? 'Pickup' : 'Delivery' }}
              </span>
            </div>
            <span :class="getStatusClasses(transaction.status)" class="flex-shrink-0 whitespace-nowrap font-semibold">
              {{ getStatusLabel(transaction.status) }}
            </span>
          </div>

          <!-- CONSOLIDATED Shipping/Tracking Info Section -->
          <div v-if="transaction.shippingUpdates && transaction.shippingUpdates.length > 0 && transaction.status !== 'Cancelled' && transaction.status !== 'Rejected'" class="mb-3">
            <div :class="[
              'rounded-lg p-3 border',
              transaction.deliveryMethod === 'pickup' 
                ? 'bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200'
                : 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200'
            ]">
              <!-- Symmetrical Single Row Layout -->
              <div class="flex items-center gap-4">
                <!-- Latest Update - 1/3 width -->
                <div class="flex items-start gap-2 flex-1 min-w-0">
                  <svg :class="[
                    'w-4 h-4 mt-0.5 flex-shrink-0',
                    transaction.deliveryMethod === 'pickup' ? 'text-purple-600' : 'text-blue-600'
                  ]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path v-if="transaction.deliveryMethod === 'pickup'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                  </svg>
                  <div class="flex-1 min-w-0">
                    <p :class="[
                      'text-xs font-semibold truncate',
                      transaction.deliveryMethod === 'pickup' ? 'text-purple-900' : 'text-blue-900'
                    ]">
                      {{ getLatestShippingUpdate(transaction)?.message }}
                    </p>
                    <p :class="[
                      'text-[10px] mt-0.5',
                      transaction.deliveryMethod === 'pickup' ? 'text-purple-600' : 'text-blue-600'
                    ]">
                      {{ formatShippingTime(getLatestShippingUpdate(transaction)?.timestamp) }}
                    </p>
                  </div>
                </div>

                <!-- Divider -->
                <div :class="[
                  'h-12 w-px',
                  transaction.deliveryMethod === 'pickup' ? 'bg-purple-200' : 'bg-blue-200'
                ]"></div>

                <!-- Additional Info: Tracking Number (Delivery) OR Pickup Schedule (Pickup) - 1/3 width -->
                <div class="flex-1 min-w-0">
                  <!-- Delivery: Tracking Number -->
                  <template v-if="!isFarmerView && transaction.deliveryMethod === 'delivery' && (transaction as BuyerTransaction).trackingNumber">
                    <div class="flex items-center gap-2">
                      <svg class="w-3.5 h-3.5 text-blue-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                      </svg>
                      <div class="flex-1 min-w-0">
                        <span class="text-[10px] text-gray-600 block">Tracking Number</span>
                        <span class="text-[11px] text-gray-900 font-bold truncate block">{{ (transaction as BuyerTransaction).trackingNumber }}</span>
                      </div>
                      <span class="text-blue-700 font-bold text-[10px] bg-blue-200 px-2 py-1 rounded-full whitespace-nowrap">In Transit</span>
                    </div>
                  </template>

                  <!-- Pickup: Schedule Info -->
                  <template v-if="transaction.deliveryMethod === 'pickup' && transaction.pickupSchedule">
                    <div class="flex items-center gap-2">
                      <svg class="w-3.5 h-3.5 text-purple-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <div class="flex-1 min-w-0">
                        <p class="text-[10px] text-purple-600 font-semibold">Pickup Schedule</p>
                        <p class="text-[11px] text-purple-900 font-bold truncate">
                          {{ transaction.pickupSchedule.availableDays.join(', ') }} • {{ transaction.pickupSchedule.startTime }}-{{ transaction.pickupSchedule.endTime }}
                        </p>
                      </div>
                    </div>
                  </template>
                </div>

                <!-- Divider -->
                <div :class="[
                  'h-12 w-px',
                  transaction.deliveryMethod === 'pickup' ? 'bg-purple-200' : 'bg-blue-200'
                ]"></div>

                <!-- Track Button - Fixed width for symmetry -->
                <div class="w-24 flex justify-center">
                  <button 
                    @click="emit('view-details', transaction)"
                    :class="[
                      'px-4 py-2 rounded-lg text-xs font-semibold transition-all shadow-sm hover:shadow-md flex items-center gap-1.5 cursor-pointer',
                      transaction.deliveryMethod === 'pickup' 
                        ? 'bg-purple-600 hover:bg-purple-700 text-white' 
                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                    ]"
                  >
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                    </svg>
                    Track
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="grid grid-cols-2 gap-2">
            <template v-if="isFarmerView">
              <!-- PENDING STATUS -->
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
              
              <!-- ACCEPTED STATUS - DIFFERENT BUTTONS FOR DELIVERY VS PICKUP -->
              <template v-if="transaction.status === 'Accepted'">
                <!-- DELIVERY METHOD - Only show if NOT already shipped -->
                <button 
                  v-if="transaction.deliveryMethod === 'delivery' && !isAlreadyShipped(transaction)"
                  @click="handleMarkAsShipped(transaction.id)"
                  :disabled="processingIds.has(transaction.id)"
                  :class="[
                    'col-span-2 px-3 py-2 rounded-lg text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2',
                    processingIds.has(transaction.id)
                      ? 'bg-gray-400 cursor-not-allowed opacity-60'
                      : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 hover:shadow-lg cursor-pointer'
                  ]"
                  class="text-white"
                >
                  <svg 
                    v-if="processingIds.has(transaction.id)" 
                    class="w-4 h-4 animate-spin" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  <svg 
                    v-else
                    class="w-4 h-4" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                  </svg>
                  {{ processingIds.has(transaction.id) ? 'Processing...' : '📦 Mark as Shipped' }}
                </button>

                <!-- PICKUP METHOD - Only show if NOT already ready -->
                <button 
                  v-if="transaction.deliveryMethod === 'pickup' && !isReadyForPickup(transaction)"
                  @click="handleMarkReadyPickup(transaction.id)"
                  :disabled="processingIds.has(transaction.id)"
                  :class="[
                    'col-span-2 px-3 py-2 rounded-lg text-xs font-bold transition-all shadow-md flex items-center justify-center gap-2',
                    processingIds.has(transaction.id)
                      ? 'bg-gray-400 cursor-not-allowed opacity-60'
                      : 'bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 hover:shadow-lg cursor-pointer'
                  ]"
                  class="text-white"
                >
                  <svg 
                    v-if="processingIds.has(transaction.id)" 
                    class="w-4 h-4 animate-spin" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  <svg 
                    v-else
                    class="w-4 h-4" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {{ processingIds.has(transaction.id) ? 'Processing...' : '✅ Ready for Pickup' }}
                </button>

                <!-- Show status message if already shipped/ready -->
                <div 
                  v-if="isAlreadyShipped(transaction) || isReadyForPickup(transaction)"
                  class="col-span-2 px-3 py-2 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg text-xs font-bold text-green-700 text-center"
                >
                  {{ isAlreadyShipped(transaction) ? '✅ Order Shipped - Awaiting Delivery Confirmation' : '✅ Order Ready - Awaiting Pickup Confirmation' }}
                </div>
              </template>
              
              <!-- COMPLETED/REJECTED -->
              <button 
                v-if="transaction.status !== 'Pending' && transaction.status !== 'Accepted'"
                @click="emit('view-details', transaction)"
                class="col-span-2 px-3 py-2 bg-gradient-to-r from-gray-100 to-gray-50 hover:from-gray-200 hover:to-gray-100 text-gray-700 rounded-lg text-xs font-bold transition-all cursor-pointer border border-gray-200"
              >
                View Details
              </button>
            </template>

            <template v-if="!isFarmerView">
              <!-- SHIPPED STATUS (Delivery) - Confirm Delivery -->
              <button 
                v-if="transaction.status === 'Shipped' && transaction.deliveryMethod === 'delivery'"
                @click="emit('confirm-delivery', transaction.id)"
                class="col-span-2 px-3 py-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-lg text-xs font-bold transition-all shadow-md hover:shadow-lg cursor-pointer"
              >
                📦 Order Received
              </button>

              <!-- SHIPPED STATUS (Pickup) - Confirm Pickup -->
              <button 
                v-if="transaction.status === 'Shipped' && transaction.deliveryMethod === 'pickup'"
                @click="handleConfirmPickup(transaction.id)"
                class="col-span-2 px-3 py-2 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white rounded-lg text-xs font-bold transition-all shadow-md hover:shadow-lg cursor-pointer flex items-center justify-center gap-2"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                ✅ Confirm Pickup
              </button>

              <!-- CANCEL BUTTON -->
              <button 
                v-if="transaction.status === 'Pending' || transaction.status === 'Accepted'"
                @click="handleCancelOrder(transaction.id)"
                class="px-3 py-2 bg-white hover:bg-red-50 text-red-600 border-2 border-red-200 hover:border-red-300 rounded-lg text-xs font-bold transition-all cursor-pointer"
              >
                Cancel
              </button>

              <!-- BUY AGAIN -->
              <button 
                v-if="transaction.status === 'Completed'"
                class="px-3 py-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-lg text-xs font-bold transition-all shadow-md hover:shadow-lg cursor-pointer"
              >
                🔁 Buy Again
              </button>

              <!-- VIEW DETAILS -->
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
        @click="navigateToMarketplace"
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

    <!-- Chat Error Toast -->
    <Transition
      enter-active-class="transition ease-out duration-300"
      enter-from-class="opacity-0 translate-y-4"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition ease-in duration-200"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 translate-y-4"
    >
      <div
        v-if="chatError"
        class="fixed bottom-4 right-4 bg-red-500 text-white px-6 py-4 rounded-lg shadow-xl z-50 max-w-md"
      >
        <div class="flex items-start gap-3">
          <svg class="w-6 h-6 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div class="flex-1">
            <p class="font-semibold mb-1">Unable to Start Chat</p>
            <p class="text-sm opacity-90">{{ chatError }}</p>
          </div>
          <button @click="chatError = null" class="flex-shrink-0">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import type { Transaction, FarmerTransaction, BuyerTransaction, ShippingUpdate } from '@/types/transactionTypes'
import { getListingId } from '@/types/transactionTypes'
import { MessagesService } from '@/services/messagesService'
import { supabase } from '@/supabase'

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
  'mark-as-shipped': [id: string]
  'mark-ready-pickup': [id: string]
  'confirm-pickup': [id: string]
  'contact-person': [transaction: Transaction]
  'create-receipt': [transaction: Transaction]
  'view-receipt': [transaction: Transaction]
  'request-receipt': [transaction: Transaction]
  'reset-filters': []
}>()

const router = useRouter()

const showConfirmModal = ref(false)
const pendingAction = ref<(() => void) | null>(null)
const confirmTitle = ref('')
const confirmMessage = ref('')
const confirmButtonText = ref('')

// Track which transactions are being processed
const processingIds = ref(new Set<string>())

// Chat state
const isStartingChat = ref(false)
const chatError = ref<string | null>(null)

const navigateToMarketplace = () => {
  router.push('/marketplace')
}

/**
 * ✅ FIXED: Handle chat with person - Updated router navigation with proper listing ID
 */
const handleChatWithPerson = async (transaction: Transaction) => {
  try {
    isStartingChat.value = true
    chatError.value = null

    console.log('💬 Starting chat for transaction:', transaction.id)

    // Get current user
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    
    if (userError || !user) {
      chatError.value = 'You must be logged in to start a chat'
      setTimeout(() => chatError.value = null, 5000)
      return
    }

    // Determine the other person's ID
    let otherPersonId: string
    let otherPersonName: string

    if ('buyer' in transaction) {
      // Farmer view - chat with buyer
      otherPersonId = transaction.buyer.id
      otherPersonName = transaction.buyer.name
    } else {
      // Buyer view - chat with farmer
      otherPersonId = transaction.farmer.id
      otherPersonName = transaction.farmer.name
    }

    // ✅ Get listing ID using the helper function
    const listingId = getListingId(transaction.animal)

    // Create initial message about the transaction
    const initialMessage = `Hi! I'm contacting you regarding Order #${transaction.id.slice(0, 8)} - ${transaction.animal.type} • ${transaction.animal.breed} (₱${transaction.amount.toLocaleString()})`

    console.log('📤 Creating conversation with:', {
      otherPersonId,
      listingId,
      otherPersonName
    })

    // Start conversation (this will create or get existing conversation)
    const result = await MessagesService.startConversationAboutListing(
      otherPersonId,
      listingId, 
      initialMessage
    )

    if (!result.success || !result.conversationId) {
      throw new Error(result.error || 'Failed to start conversation')
    }

    console.log('✅ Conversation started:', result.conversationId)

    // ✅ Navigate to messages page with conversation ID
    await router.push({
      name: 'Messages',
      params: { conversationId: result.conversationId }
    })

  } catch (error: any) {
    console.error('❌ Error starting chat:', error)
    chatError.value = error.message || 'Failed to start chat. Please try again.'
    setTimeout(() => chatError.value = null, 5000)
  } finally {
    isStartingChat.value = false
  }
}

// Helper function to check if order has been shipped
const isAlreadyShipped = (transaction: Transaction): boolean => {
  // Check if there's a shipping update with 'shipped' status
  if (transaction.shippingUpdates && transaction.shippingUpdates.length > 0) {
    return transaction.shippingUpdates.some(update => 
      ['shipped', 'in_transit', 'out_for_delivery'].includes(update.status)
    )
  }
  // Also check currentShippingStatus
  return ['shipped', 'in_transit', 'out_for_delivery'].includes(transaction.currentShippingStatus || '')
}

// Helper function to check if order is ready for pickup
const isReadyForPickup = (transaction: Transaction): boolean => {
  // Check if there's a shipping update with 'ready_for_pickup' status
  if (transaction.shippingUpdates && transaction.shippingUpdates.length > 0) {
    return transaction.shippingUpdates.some(update => 
      update.status === 'ready_for_pickup'
    )
  }
  // Also check currentShippingStatus
  return transaction.currentShippingStatus === 'ready_for_pickup'
}

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

const handleMarkAsShipped = (id: string) => {
  // Prevent double-clicking
  if (processingIds.value.has(id)) return
  
  confirmTitle.value = 'Mark as Shipped'
  confirmMessage.value = 'Confirm that this order has been shipped and is on its way to the buyer?'
  confirmButtonText.value = 'Yes, Mark as Shipped'
  pendingAction.value = () => {
    processingIds.value.add(id)
    emit('mark-as-shipped', id)
    // Remove from processing after 2 seconds (adjust based on your API response time)
    setTimeout(() => {
      processingIds.value.delete(id)
    }, 2000)
  }
  showConfirmModal.value = true
}

const handleMarkReadyPickup = (id: string) => {
  // Prevent double-clicking
  if (processingIds.value.has(id)) return
  
  confirmTitle.value = 'Ready for Pickup'
  confirmMessage.value = 'Confirm that this order is ready for the buyer to pick up?'
  confirmButtonText.value = 'Yes, Ready for Pickup'
  pendingAction.value = () => {
    processingIds.value.add(id)
    emit('mark-ready-pickup', id)
    // Remove from processing after 2 seconds (adjust based on your API response time)
    setTimeout(() => {
      processingIds.value.delete(id)
    }, 2000)
  }
  showConfirmModal.value = true
}

const handleConfirmPickup = (id: string) => {
  confirmTitle.value = 'Confirm Pickup'
  confirmMessage.value = 'Confirm that you have picked up this order from the farmer?'
  confirmButtonText.value = 'Yes, Confirm Pickup'
  pendingAction.value = () => emit('confirm-pickup', id)
  showConfirmModal.value = true
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

const getLatestShippingUpdate = (transaction: Transaction): ShippingUpdate | undefined => {
  if (!transaction.shippingUpdates || transaction.shippingUpdates.length === 0) return undefined
  return transaction.shippingUpdates[transaction.shippingUpdates.length - 1]
}

const formatShippingTime = (timestamp: string | undefined): string => {
  if (!timestamp) return ''
  const date = new Date(timestamp)
  return date.toLocaleString('en-US', { 
    month: 'short', 
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit'
  })
}

const getPersonInfo = (transaction: Transaction) => {
  if ('buyer' in transaction) {
    // Farmer view - showing buyer info
    return {
      id: transaction.buyer.id,
      name: transaction.buyer.name,
      avatar: transaction.buyer.avatar || 'https://via.placeholder.com/40',
      farmName: transaction.buyer.farm // Buyer's farm if they're also a farmer
    }
  } else {
    // Buyer view - showing farmer info
    return {
      id: transaction.farmer.id,
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
      return `${baseClasses} bg-red-100 text-red-700 border-2 border-red-400 font-bold`
    default:
      return `${baseClasses} bg-gray-100 text-gray-700 border border-gray-300`
  }
}
</script>