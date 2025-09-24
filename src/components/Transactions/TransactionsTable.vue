<template>
  <div class="flex-1 overflow-hidden">
    <div class="h-full flex flex-col">
      <!-- Enhanced Table Container with glassmorphism -->
      <div class="flex-1 overflow-auto bg-white/95 backdrop-blur-sm rounded-xl border border-white/60 shadow-lg">
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <!-- Enhanced Fixed Table Header -->
            <thead class="bg-gradient-to-r from-green-50 via-emerald-50 to-teal-50 sticky top-0 z-10 border-b border-green-100">
              <tr>
                <th scope="col" class="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider w-1/4 border-r border-green-100/50">
                  <div class="flex items-center gap-2">
                    <div class="w-6 h-6 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg flex items-center justify-center shadow-sm">
                      <svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                    </div>
                    Livestock
                  </div>
                </th>
                <th scope="col" class="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider w-1/4 border-r border-green-100/50">
                  <div class="flex items-center gap-2">
                    <div class="w-6 h-6 bg-gradient-to-br from-blue-400 to-blue-500 rounded-lg flex items-center justify-center shadow-sm">
                      <svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    Buyer
                  </div>
                </th>
                <th scope="col" class="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider w-1/6 border-r border-green-100/50">
                  <div class="flex items-center gap-2">
                    <div class="w-6 h-6 bg-gradient-to-br from-purple-400 to-purple-500 rounded-lg flex items-center justify-center shadow-sm">
                      <svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    Date
                  </div>
                </th>
                <th scope="col" class="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider w-1/6 border-r border-green-100/50">
                  <div class="flex items-center gap-2">
                    <div class="w-6 h-6 bg-gradient-to-br from-amber-400 to-orange-500 rounded-lg flex items-center justify-center shadow-sm">
                      <svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    Status
                  </div>
                </th>
                <th scope="col" class="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider w-1/6 border-r border-green-100/50">
                  <div class="flex items-center gap-2">
                    <div class="w-6 h-6 bg-gradient-to-br from-emerald-400 to-green-500 rounded-lg flex items-center justify-center shadow-sm">
                      <svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    Amount
                  </div>
                </th>
                <th scope="col" class="px-6 py-4 text-center text-xs font-bold text-gray-700 uppercase tracking-wider w-1/12">
                  <div class="flex items-center justify-center gap-2">
                    <div class="w-6 h-6 bg-gradient-to-br from-gray-400 to-gray-500 rounded-lg flex items-center justify-center shadow-sm">
                      <svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                      </svg>
                    </div>
                    Actions
                  </div>
                </th>
              </tr>
            </thead>

            <!-- Enhanced Table Body -->
            <tbody class="bg-white/95 backdrop-blur-sm divide-y divide-gray-100">
              <tr 
                v-for="(transaction, index) in transactions" 
                :key="transaction.id" 
                class="hover:bg-gradient-to-r hover:from-green-50/80 hover:via-emerald-50/60 hover:to-teal-50/40 transition-all duration-200 group border-b border-gray-100/60"
                :class="{ 'bg-green-25/30': index % 2 === 0 }"
              >
                <!-- Livestock Cell -->
                <td class="px-6 py-4 whitespace-nowrap w-1/4 border-r border-gray-100/60">
                  <div class="flex items-center">
                    <div class="flex-shrink-0 h-12 w-12 relative">
                      <img 
                        class="h-12 w-12 rounded-xl object-cover border-2 border-white shadow-lg group-hover:shadow-xl transition-shadow duration-200" 
                        :src="transaction.livestock.image" 
                        :alt="transaction.livestock.type"
                      />
                      <div class="absolute -bottom-1 -right-1 w-4 h-4 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full border-2 border-white shadow-sm flex items-center justify-center">
                        <svg class="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                        </svg>
                      </div>
                    </div>
                    <div class="ml-4 min-w-0">
                      <div class="text-sm font-bold text-gray-900 truncate group-hover:text-green-700 transition-colors">
                        {{ transaction.livestock.type }}
                      </div>
                      <div class="text-xs text-gray-600 truncate font-medium">
                        {{ transaction.livestock.breed }}
                      </div>
                      <div class="text-xs text-gray-400 truncate mt-0.5">
                        ID: #{{ transaction.livestock.id }}
                      </div>
                    </div>
                  </div>
                </td>

                <!-- Buyer Cell -->
                <td class="px-6 py-4 whitespace-nowrap w-1/4 border-r border-gray-100/60">
                  <div class="flex items-center">
                    <div class="flex-shrink-0 h-12 w-12 relative">
                      <img 
                        class="h-12 w-12 rounded-full object-cover border-2 border-white shadow-lg group-hover:shadow-xl transition-shadow duration-200" 
                        :src="transaction.buyer.avatar" 
                        :alt="transaction.buyer.name"
                      />
                      <div class="absolute -bottom-1 -right-1 w-4 h-4 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full border-2 border-white shadow-sm flex items-center justify-center">
                        <svg class="w-2 h-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </div>
                    <div class="ml-4 min-w-0">
                      <div class="text-sm font-bold text-gray-900 truncate group-hover:text-blue-700 transition-colors">
                        {{ transaction.buyer.name }}
                      </div>
                      <div class="text-xs text-gray-600 truncate font-medium">
                        {{ transaction.buyer.contact }}
                      </div>
                      <div class="text-xs text-gray-400 truncate mt-0.5">
                        {{ transaction.buyer.address }}
                      </div>
                    </div>
                  </div>
                </td>

                <!-- Date Cell -->
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-600 w-1/6 border-r border-gray-100/60">
                  <div class="flex items-center gap-2">
                    <div class="w-8 h-8 bg-gradient-to-br from-purple-100 to-purple-200 rounded-lg flex items-center justify-center">
                      <svg class="w-3 h-3 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <div class="text-sm font-semibold text-gray-800">
                        {{ formatDate(transaction.date) }}
                      </div>
                      <div class="text-xs text-gray-500">
                        {{ formatTime(transaction.date) }}
                      </div>
                    </div>
                  </div>
                </td>

                <!-- Status Cell -->
                <td class="px-6 py-4 whitespace-nowrap w-1/6 border-r border-gray-100/60">
                  <div class="flex items-center gap-2">
                    <div class="flex-shrink-0">
                      <div :class="`w-3 h-3 rounded-full ${getStatusDotClass(transaction.status)}`"></div>
                    </div>
                    <span :class="`px-3 py-1.5 inline-flex text-xs leading-4 font-bold rounded-lg shadow-sm border ${getStatusClass(transaction.status)}`">
                      {{ transaction.status }}
                    </span>
                  </div>
                </td>

                <!-- Amount Cell -->
                <td class="px-6 py-4 whitespace-nowrap w-1/6 border-r border-gray-100/60">
                  <div class="flex items-center gap-3">
                    <div class="w-10 h-10 bg-gradient-to-br from-emerald-100 to-green-200 rounded-xl flex items-center justify-center shadow-sm">
                      <span class="text-emerald-700 font-bold text-sm">₱</span>
                    </div>
                    <div>
                      <div class="text-lg font-bold text-gray-900 group-hover:text-emerald-700 transition-colors">
                        {{ transaction.amount.toLocaleString() }}
                      </div>
                      <div class="text-xs text-gray-500 font-medium">
                        {{ transaction.paymentMethod }}
                      </div>
                    </div>
                  </div>
                </td>

                <!-- Actions Cell -->
                <td class="px-6 py-4 whitespace-nowrap text-center w-1/12">
                  <div class="flex justify-center gap-2">
                    <!-- View Details Button -->
                    <button 
                      @click="$emit('viewDetails', transaction)"
                      class="group/btn relative p-2 bg-gradient-to-br from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                      title="View Details"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      <div class="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded px-2 py-1 opacity-0 group-hover/btn:opacity-100 transition-opacity whitespace-nowrap">
                        View Details
                      </div>
                    </button>

                    <!-- Accept Order Button (conditional) -->
                    <button 
                      v-if="transaction.status === 'Pending'"
                      @click="$emit('updateStatus', transaction.id, 'Accepted')"
                      class="group/btn relative p-2 bg-gradient-to-br from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                      title="Accept Order"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <div class="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded px-2 py-1 opacity-0 group-hover/btn:opacity-100 transition-opacity whitespace-nowrap">
                        Accept Order
                      </div>
                    </button>

                    <!-- Reject Order Button (conditional) -->
                    <button 
                      v-if="transaction.status === 'Pending'"
                      @click="$emit('updateStatus', transaction.id, 'Rejected')"
                      class="group/btn relative p-2 bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                      title="Reject Order"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      <div class="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded px-2 py-1 opacity-0 group-hover/btn:opacity-100 transition-opacity whitespace-nowrap">
                        Reject Order
                      </div>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Enhanced Empty State -->
        <div 
          v-if="transactions.length === 0"
          class="text-center py-16"
        >
          <div class="bg-white/95 backdrop-blur-sm p-8 rounded-2xl border border-white/60 max-w-lg mx-auto text-center shadow-xl">
            <div class="w-20 h-20 bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-inner">
              <svg class="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 class="text-2xl font-bold text-gray-800 mb-3">No transactions found</h3>
            <p class="text-sm text-gray-600 mb-8 leading-relaxed max-w-md mx-auto">
              We couldn't find any transactions matching your current search criteria. Try adjusting your filters or check back later for new orders.
            </p>
            <div class="flex flex-col sm:flex-row gap-3 justify-center">
              <button 
                @click="$emit('resetFilters')"
                class="px-6 py-3 bg-gradient-to-r from-green-600 via-green-700 to-emerald-700 hover:from-green-700 hover:via-green-800 hover:to-emerald-800 text-white rounded-xl text-sm font-bold transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2 justify-center transform hover:scale-105"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Reset All Filters
              </button>
              <button 
                class="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl text-sm font-bold transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2 justify-center transform hover:scale-105"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                View Marketplace
              </button>
            </div>
          </div>
        </div>

        <!-- Enhanced Pagination -->
        <div class="flex items-center justify-between mt-6 px-6 py-4 bg-gradient-to-r from-green-50/80 to-emerald-50/60 backdrop-blur-sm rounded-b-xl border-t border-green-100">
          <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center shadow-sm">
                <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <p class="text-sm text-gray-700 font-semibold">
                Showing <span class="font-bold text-green-600">1</span> to <span class="font-bold text-green-600">{{ Math.min(transactions.length, 10) }}</span> of <span class="font-bold text-green-600">{{ transactions.length }}</span> results
              </p>
            </div>
            <div>
              <nav class="relative z-0 inline-flex rounded-xl shadow-lg" aria-label="Pagination">
                <button class="relative inline-flex items-center px-3 py-2 rounded-l-xl border border-green-200 bg-white/80 backdrop-blur-sm text-sm font-semibold text-gray-500 hover:bg-green-50 hover:text-green-600 transition-all duration-200">
                  <span class="sr-only">Previous</span>
                  <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button class="relative inline-flex items-center px-4 py-2 border-t border-b border-green-200 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-sm font-bold shadow-lg">
                  1
                </button>
                <button class="relative inline-flex items-center px-4 py-2 border-t border-b border-green-200 bg-white/80 backdrop-blur-sm text-gray-600 hover:bg-green-50 hover:text-green-700 text-sm font-semibold transition-all duration-200">
                  2
                </button>
                <button class="relative inline-flex items-center px-4 py-2 border-t border-b border-green-200 bg-white/80 backdrop-blur-sm text-gray-600 hover:bg-green-50 hover:text-green-700 text-sm font-semibold transition-all duration-200">
                  3
                </button>
                <button class="relative inline-flex items-center px-3 py-2 rounded-r-xl border border-green-200 bg-white/80 backdrop-blur-sm text-sm font-semibold text-gray-500 hover:bg-green-50 hover:text-green-600 transition-all duration-200">
                  <span class="sr-only">Next</span>
                  <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </nav>
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
  transactions: Transaction[]
  sortBy: string
}

interface Emits {
  (e: 'viewDetails', transaction: Transaction): void
  (e: 'updateStatus', id: string, status: 'Accepted' | 'Rejected'): void
  (e: 'resetFilters'): void
}

defineProps<Props>()
const emit = defineEmits<Emits>()

const formatDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const formatTime = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = { 
    hour: '2-digit', 
    minute: '2-digit' 
  };
  return new Date(dateString).toLocaleTimeString(undefined, options);
};

const getStatusClass = (status: string): string => {
  switch (status) {
    case 'Pending': 
      return 'bg-gradient-to-r from-yellow-100 to-amber-100 text-yellow-800 border-yellow-300';
    case 'Accepted': 
      return 'bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 border-blue-300';
    case 'Completed': 
      return 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border-green-300';
    case 'Rejected': 
      return 'bg-gradient-to-r from-red-100 to-rose-100 text-red-800 border-red-300';
    default: 
      return 'bg-gradient-to-r from-gray-100 to-slate-100 text-gray-800 border-gray-300';
  }
};

const getStatusDotClass = (status: string): string => {
  switch (status) {
    case 'Pending': return 'bg-yellow-400 animate-pulse';
    case 'Accepted': return 'bg-blue-400 animate-pulse';
    case 'Completed': return 'bg-green-400';
    case 'Rejected': return 'bg-red-400';
    default: return 'bg-gray-400';
  }
};
</script>