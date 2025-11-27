<!-- components/Transactions/ReceiptModal.vue -->
<template>
  <!-- CREATE RECEIPT MODAL -->
  <div
    v-if="showModal && mode === 'create'"
    class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
    @click.self="closeModal"
  >
    <div class="bg-white rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden shadow-2xl transform transition-all">
      <!-- Header -->
      <div class="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white px-6 py-4 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div>
            <h2 class="text-xl font-bold">Create Receipt</h2>
            <p class="text-green-100 text-sm">Generate official transaction receipt</p>
          </div>
        </div>
        <button
          @click="closeModal"
          class="p-2 hover:bg-white/20 rounded-lg transition-colors"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Content -->
      <div class="overflow-y-auto max-h-[calc(90vh-180px)] p-6">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <!-- Left Side - Form -->
          <div class="space-y-4">
            <div class="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200">
              <h3 class="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Receipt Information
              </h3>
              
              <div class="space-y-3">
                <div>
                  <label class="block text-xs font-semibold text-gray-700 mb-1">Receipt Number</label>
                  <input
                    v-model="localReceiptForm.receiptNumber"
                    type="text"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    placeholder="Auto-generated"
                  />
                </div>

                <div>
                  <label class="block text-xs font-semibold text-gray-700 mb-1">Issue Date</label>
                  <input
                    v-model="localReceiptForm.issueDate"
                    type="date"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                </div>

                <div>
                  <label class="block text-xs font-semibold text-gray-700 mb-1">Payment Status</label>
                  <select
                    v-model="localReceiptForm.paymentStatus"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  >
                    <option value="Paid">Paid</option>
                    <option value="Partially Paid">Partially Paid</option>
                    <option value="Pending">Pending</option>
                  </select>
                </div>
              </div>
            </div>

            <!-- Farmer Information -->
            <div class="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4 border border-blue-200">
              <h3 class="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Farmer Information
              </h3>
              
              <div class="space-y-3">
                <div>
                  <label class="block text-xs font-semibold text-gray-700 mb-1">Business Name</label>
                  <input
                    v-model="localReceiptForm.farmerName"
                    type="text"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                </div>

                <div>
                  <label class="block text-xs font-semibold text-gray-700 mb-1">Address</label>
                  <textarea
                    v-model="localReceiptForm.farmerAddress"
                    rows="2"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  ></textarea>
                </div>

                <div class="grid grid-cols-2 gap-3">
                  <div>
                    <label class="block text-xs font-semibold text-gray-700 mb-1">Contact</label>
                    <input
                      v-model="localReceiptForm.farmerContact"
                      type="text"
                      class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                  </div>

                  <div>
                    <label class="block text-xs font-semibold text-gray-700 mb-1">Email</label>
                    <input
                      v-model="localReceiptForm.farmerEmail"
                      type="email"
                      class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                </div>

                <div>
                  <label class="block text-xs font-semibold text-gray-700 mb-1">TIN (Optional)</label>
                  <input
                    v-model="localReceiptForm.farmerTIN"
                    type="text"
                    placeholder="000-000-000-000"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                </div>
              </div>
            </div>

            <!-- Buyer Information -->
            <div class="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-200">
              <h3 class="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Buyer Information
              </h3>
              
              <div class="space-y-3">
                <div>
                  <label class="block text-xs font-semibold text-gray-700 mb-1">Buyer Name</label>
                  <input
                    v-model="localReceiptForm.buyerName"
                    type="text"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  />
                </div>

                <div>
                  <label class="block text-xs font-semibold text-gray-700 mb-1">Address</label>
                  <textarea
                    v-model="localReceiptForm.buyerAddress"
                    rows="2"
                    class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  ></textarea>
                </div>

                <div class="grid grid-cols-2 gap-3">
                  <div>
                    <label class="block text-xs font-semibold text-gray-700 mb-1">Contact</label>
                    <input
                      v-model="localReceiptForm.buyerContact"
                      type="text"
                      class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                  </div>

                  <div>
                    <label class="block text-xs font-semibold text-gray-700 mb-1">Email</label>
                    <input
                      v-model="localReceiptForm.buyerEmail"
                      type="email"
                      class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            <!-- Additional Notes -->
            <div class="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-4 border border-amber-200">
              <h3 class="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                <svg class="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                </svg>
                Additional Notes
              </h3>
              <textarea
                v-model="localReceiptForm.notes"
                rows="3"
                placeholder="Add any additional notes, terms, or conditions..."
                class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-green-500"
              ></textarea>
            </div>
          </div>

          <!-- Right Side - Compact Receipt Preview -->
          <div class="lg:sticky lg:top-0">
            <div id="receipt-preview" class="bg-white border-2 border-gray-300 rounded-lg shadow-lg overflow-hidden">
              <!-- Compact Receipt Header with Logo -->
              <div class="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-4">
                <div class="flex items-center justify-between mb-3">
                  <div class="flex items-center gap-3">
                    <!-- Logo with green background for visibility -->
                    <div class="w-12 h-12 bg-green-800 rounded-lg p-2 flex items-center justify-center">
                      <img 
                        src="@/assets/Logo.png" 
                        alt="LivestoX Logo" 
                        class="w-full h-full object-contain"
                      />
                    </div>
                    <div>
                      <h1 class="text-lg font-bold">OFFICIAL RECEIPT</h1>
                      <p class="text-green-100 text-xs">LivestoX Marketplace</p>
                    </div>
                  </div>
                </div>
                
                <div class="flex items-center justify-between text-xs">
                  <div>
                    <p class="text-green-100 text-xs">Receipt No.</p>
                    <p class="font-bold">{{ localReceiptForm.receiptNumber }}</p>
                  </div>
                  <div class="text-right">
                    <p class="text-green-100 text-xs">Date</p>
                    <p class="font-bold text-sm">{{ formatReceiptDate(localReceiptForm.issueDate) }}</p>
                  </div>
                </div>
              </div>

              <!-- Compact Farmer & Buyer Info -->
              <div class="p-3 bg-gray-50 border-b border-gray-200">
                <div class="grid grid-cols-2 gap-3 text-xs">
                  <!-- Farmer Info -->
                  <div class="bg-white rounded p-2 border border-blue-100">
                    <p class="text-[10px] font-bold text-gray-500 uppercase mb-1 flex items-center gap-1">
                      <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"/>
                      </svg>
                      From (Seller)
                    </p>
                    <p class="font-bold text-gray-900 text-xs mb-0.5">{{ localReceiptForm.farmerName }}</p>
                    <p class="text-[10px] text-gray-600 leading-tight">{{ localReceiptForm.farmerAddress }}</p>
                    <p class="text-[10px] text-gray-600">{{ localReceiptForm.farmerContact }}</p>
                    <p class="text-[10px] text-gray-600">{{ localReceiptForm.farmerEmail }}</p>
                    <p v-if="localReceiptForm.farmerTIN" class="text-[10px] text-gray-500 mt-1">TIN: {{ localReceiptForm.farmerTIN }}</p>
                  </div>
                  
                  <!-- Buyer Info -->
                  <div class="bg-white rounded p-2 border border-purple-100">
                    <p class="text-[10px] font-bold text-gray-500 uppercase mb-1 flex items-center gap-1">
                      <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/>
                      </svg>
                      To (Buyer)
                    </p>
                    <p class="font-bold text-gray-900 text-xs mb-0.5">{{ localReceiptForm.buyerName }}</p>
                    <p class="text-[10px] text-gray-600 leading-tight">{{ localReceiptForm.buyerAddress }}</p>
                    <p class="text-[10px] text-gray-600">{{ localReceiptForm.buyerContact }}</p>
                    <p class="text-[10px] text-gray-600">{{ localReceiptForm.buyerEmail }}</p>
                  </div>
                </div>
              </div>

              <!-- Compact Items Table - Supports Multiple Items -->
              <div class="p-3">
                <h3 class="text-xs font-bold text-gray-900 mb-2">Transaction Details</h3>
                <div class="border border-gray-200 rounded overflow-hidden">
                  <table class="w-full text-xs">
                    <thead class="bg-gray-50">
                      <tr>
                        <th class="text-left p-2 font-bold text-gray-700 text-[10px]">Description</th>
                        <th class="text-center p-2 font-bold text-gray-700 text-[10px]">Qty</th>
                        <th class="text-right p-2 font-bold text-gray-700 text-[10px]">Price</th>
                        <th class="text-right p-2 font-bold text-gray-700 text-[10px]">Amount</th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-100">
                      <!-- Support for multiple animals -->
                      <tr v-if="transaction?.animal">
                        <td class="p-2">
                          <p class="font-semibold text-gray-900">{{ transaction.animal.type }} - {{ transaction.animal.breed }}</p>
                          <p class="text-[10px] text-gray-500">{{ transaction.animal.age }} • {{ transaction.animal.gender }} • {{ transaction.animal.weight }}{{ transaction.animal.weightUnit }}</p>
                        </td>
                        <td class="text-center p-2 text-gray-900">{{ transaction.animal.quantity }}</td>
                        <td class="text-right p-2 text-gray-900">₱{{ formatNumber(transaction.animal.price || 0) }}</td>
                        <td class="text-right p-2 font-semibold text-gray-900">₱{{ formatNumber((transaction.animal.price || 0) * (transaction.animal.quantity || 1)) }}</td>
                      </tr>
                      <!-- Support for multiple items from transaction.items if available -->
                      <tr v-for="(item, index) in transaction?.items" :key="index">
                        <td class="p-2">
                          <p class="font-semibold text-gray-900">{{ item.type }} - {{ item.breed }}</p>
                          <p class="text-[10px] text-gray-500">{{ item.age }} • {{ item.gender }} • {{ item.weight }}{{ item.weightUnit }}</p>
                        </td>
                        <td class="text-center p-2 text-gray-900">{{ item.quantity }}</td>
                        <td class="text-right p-2 text-gray-900">₱{{ formatNumber(item.price || 0) }}</td>
                        <td class="text-right p-2 font-semibold text-gray-900">₱{{ formatNumber((item.price || 0) * (item.quantity || 1)) }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <!-- Compact Totals -->
                <div class="mt-3 bg-gray-50 rounded p-2 space-y-1 text-xs">
                  <div class="flex justify-between">
                    <span class="text-gray-600">Subtotal:</span>
                    <span class="font-semibold text-gray-900">₱{{ formatNumber(calculateTotal()) }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-gray-600">Tax (0%):</span>
                    <span class="font-semibold text-gray-900">₱0.00</span>
                  </div>
                  <div class="border-t border-gray-300 pt-1 flex justify-between items-center">
                    <span class="font-bold text-gray-900">Total:</span>
                    <span class="text-lg font-bold text-green-600">₱{{ formatNumber(calculateTotal()) }}</span>
                  </div>
                </div>

                <!-- Compact Payment Info -->
                <div class="mt-3 bg-green-50 border border-green-200 rounded p-2">
                  <div class="flex items-center justify-between text-xs mb-1">
                    <span class="text-gray-700 font-medium">Payment Method:</span>
                    <span class="font-bold text-gray-900">{{ transaction?.paymentMethod }}</span>
                  </div>
                  <div class="flex items-center justify-between text-xs">
                    <span class="text-gray-700 font-medium">Status:</span>
                    <span :class="{
                      'text-green-700 bg-green-100': localReceiptForm.paymentStatus === 'Paid',
                      'text-yellow-700 bg-yellow-100': localReceiptForm.paymentStatus === 'Partially Paid',
                      'text-orange-700 bg-orange-100': localReceiptForm.paymentStatus === 'Pending'
                    }" class="px-2 py-0.5 rounded-full text-[10px] font-bold">
                      {{ localReceiptForm.paymentStatus }}
                    </span>
                  </div>
                </div>

                <!-- Compact Notes -->
                <div v-if="localReceiptForm.notes" class="mt-3 bg-amber-50 border border-amber-200 rounded p-2">
                  <p class="text-[10px] font-bold text-gray-700 uppercase mb-1">Notes:</p>
                  <p class="text-xs text-gray-700 whitespace-pre-wrap">{{ localReceiptForm.notes }}</p>
                </div>

                <!-- Compact Footer -->
                <div class="mt-3 pt-2 border-t border-gray-200 text-center">
                  <p class="text-[10px] text-gray-600 mb-1">
                    Official receipt by LivestoX Marketplace
                  </p>
                  <p class="text-[10px] text-gray-500">
                    Transaction ID: {{ transaction?.id }}
                  </p>
                  <div class="mt-1 flex items-center justify-center gap-1 text-[10px] text-gray-500">
                    <svg class="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                    </svg>
                    Verified
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Modal Footer Actions -->
      <div class="border-t border-gray-200 px-6 py-4 bg-gray-50 flex items-center justify-between gap-3">
        <div class="flex gap-3">
          <button
            @click="$emit('download', localReceiptForm)"
            class="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-semibold transition-colors flex items-center gap-2"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download PDF
          </button>
          <button
            @click="$emit('print')"
            class="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg text-sm font-semibold transition-colors flex items-center gap-2"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            Print
          </button>
          <button
            @click="$emit('save', localReceiptForm)"
            class="px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-lg text-sm font-bold transition-all shadow-md hover:shadow-lg flex items-center gap-2"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            Save Receipt
          </button>
        </div>
      </div>
    </div>
  </div>

  <!-- VIEW RECEIPT MODAL -->
  <div
    v-if="showModal && mode === 'view'"
    class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
    @click.self="closeModal"
  >
    <div class="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
      <!-- Header -->
      <div class="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white px-6 py-4 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </div>
          <div>
            <h2 class="text-xl font-bold">View Receipt</h2>
            <p class="text-green-100 text-sm">Official Transaction Receipt</p>
          </div>
        </div>
        <button
          @click="closeModal"
          class="p-2 hover:bg-white/20 rounded-lg transition-colors"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Receipt Content -->
      <div class="overflow-y-auto max-h-[calc(90vh-180px)] p-6">
        <div class="bg-white border-2 border-gray-300 rounded-xl shadow-lg overflow-hidden">
          <div class="text-center py-12">
            <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 class="text-lg font-bold text-gray-900 mb-2">Receipt Available</h3>
            <p class="text-sm text-gray-600">Receipt #{{ localReceiptForm.receiptNumber }}</p>
          </div>
        </div>
      </div>

      <!-- Footer Actions -->
      <div class="border-t border-gray-200 px-6 py-4 bg-gray-50 flex items-center justify-between gap-3">
        <button
          @click="closeModal"
          class="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-semibold transition-colors"
        >
          Close
        </button>
        <div class="flex gap-3">
          <button
            @click="$emit('download', localReceiptForm)"
            class="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-semibold transition-colors flex items-center gap-2"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download
          </button>
          <button
            @click="$emit('print')"
            class="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg text-sm font-semibold transition-colors flex items-center gap-2"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            Print
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import type { ReceiptForm } from '@/types/transactionTypes'

interface Props {
  showModal: boolean
  mode: 'create' | 'view'
  receiptForm: ReceiptForm
  transaction: any
}

const props = defineProps<Props>()

const emit = defineEmits<{
  close: []
  save: [form: ReceiptForm]
  download: [form: ReceiptForm]
  print: []
}>()

const localReceiptForm = ref<ReceiptForm>({ ...props.receiptForm })

watch(() => props.receiptForm, (newForm) => {
  localReceiptForm.value = { ...newForm }
}, { deep: true })

const closeModal = () => {
  emit('close')
}

const formatReceiptDate = (dateString: string): string => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric',
    year: 'numeric'
  })
}

const formatNumber = (num: number): string => {
  return num.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })
}

const calculateTotal = (): number => {
  let total = 0
  
  // Calculate from single animal if exists
  if (props.transaction?.animal) {
    const price = props.transaction.animal.price || 0
    const quantity = props.transaction.animal.quantity || 1
    total += price * quantity
  }
  
  // Calculate from multiple items if exists
  if (props.transaction?.items && Array.isArray(props.transaction.items)) {
    props.transaction.items.forEach((item: any) => {
      const price = item.price || 0
      const quantity = item.quantity || 1
      total += price * quantity
    })
  }
  
  // Fallback to transaction amount
  if (total === 0 && props.transaction?.amount) {
    total = props.transaction.amount
  }
  
  return total
}
</script>

<style scoped>
/* Print styles */
@media print {
  body * {
    visibility: hidden;
  }
  #receipt-preview,
  #receipt-preview * {
    visibility: visible;
  }
  #receipt-preview {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
  }
}
</style>