<!-- CreateListingModal.vue -->
<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/50 backdrop-blur-sm">
    <div class="bg-white rounded-xl shadow-2xl max-w-6xl w-full max-h-[95vh] overflow-hidden transform transition-all duration-300">
      
      <!-- Header -->
      <div class="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white p-4 border-b border-green-200">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <div>
              <h2 class="text-lg font-bold text-white">Create New Listing</h2>
              <p class="text-green-100 text-xs">Add your livestock to the marketplace</p>
            </div>
          </div>
          <button @click="closeModal" :disabled="isSubmitting"
            class="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed">
            <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Error Alert -->
      <div v-if="submitError" class="bg-red-50 border-l-4 border-red-500 p-4 m-4">
        <div class="flex items-start">
          <svg class="w-5 h-5 text-red-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <h3 class="text-sm font-semibold text-red-800">Error Creating Listing</h3>
            <p class="text-sm text-red-700 mt-1">{{ submitError }}</p>
          </div>
          <button @click="submitError = ''" class="ml-auto text-red-500 hover:text-red-700">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Main Content - Two Section Layout -->
      <div class="overflow-y-auto max-h-[calc(95vh-80px)]">
        <form @submit.prevent="handleSubmit" class="flex">
          
          <!-- Left Section - Images -->
          <div class="w-2/5 bg-gradient-to-br from-cyan-50 to-blue-50 p-4 border-r border-gray-200">
            <div class="sticky top-0 space-y-4">
              <div class="text-center">
                <h3 class="text-base font-bold text-gray-900 mb-1 flex items-center justify-center gap-2">
                  <svg class="w-5 h-5 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 002 2z" />
                  </svg>
                  Livestock Images
                </h3>
                <p class="text-xs text-gray-600 mb-3">Upload up to 5 high-quality images</p>
              </div>

              <!-- Main Image Preview -->
              <div class="relative">
                <div class="w-full h-64 bg-gray-100 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden">
                  <div v-if="form.images.length === 0" class="text-center p-6">
                    <svg class="mx-auto h-12 w-12 text-gray-400 mb-3" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <p class="text-gray-500 font-medium mb-3 text-sm">No images uploaded</p>
                    <label class="cursor-pointer">
                      <input type="file" multiple accept="image/*" @change="handleImageUpload" class="sr-only" />
                      <span
                        class="inline-flex items-center px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg font-medium transition-colors shadow-lg text-sm">
                        <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                        </svg>
                        Choose Files
                      </span>
                    </label>
                    <p class="text-xs text-gray-400 mt-2">PNG, JPG, GIF up to 10MB each</p>
                  </div>
                  <img v-else :src="form.images[selectedImageIndex]" alt="Main preview" class="w-full h-full object-cover rounded-lg" />
                </div>

                <!-- Navigation arrows for main preview -->
                <div v-if="form.images.length > 1" class="absolute inset-y-0 left-0 flex items-center">
                  <button @click="previousImage" type="button"
                    class="ml-2 w-8 h-8 bg-black/60 hover:bg-black/80 text-white rounded-full flex items-center justify-center transition-all duration-200 shadow-lg">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                </div>
                <div v-if="form.images.length > 1" class="absolute inset-y-0 right-0 flex items-center">
                  <button @click="nextImage" type="button"
                    class="mr-2 w-8 h-8 bg-black/60 hover:bg-black/80 text-white rounded-full flex items-center justify-center transition-all duration-200 shadow-lg">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>

                <!-- Add more images button when images exist -->
                <div v-if="form.images.length > 0 && form.images.length < 5" class="absolute bottom-2 right-2">
                  <label class="cursor-pointer">
                    <input type="file" multiple accept="image/*" @change="handleImageUpload" class="sr-only" />
                    <span
                      class="inline-flex items-center px-3 py-1.5 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg font-medium transition-colors shadow-lg text-xs">
                      <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                      </svg>
                      Add More
                    </span>
                  </label>
                </div>
              </div>

              <!-- Thumbnail Gallery -->
              <div v-if="form.images.length > 0" class="grid grid-cols-5 gap-2">
                <div v-for="(image, index) in form.images" :key="index"
                  class="relative group cursor-pointer" @click="selectedImageIndex = index">
                  <img :src="image" :alt="`Thumbnail ${index + 1}`"
                    :class="`w-full h-14 object-cover rounded-lg border-2 transition-all ${selectedImageIndex === index ? 'border-cyan-500 ring-2 ring-cyan-200' : 'border-gray-200 hover:border-gray-400'}`" />
                  <button @click.stop="removeImage(index)" type="button"
                    class="absolute -top-1 -right-1 w-5 h-5 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-xs font-bold shadow-lg">
                    ×
                  </button>
                </div>
              </div>

              <!-- Image Counter -->
              <div v-if="form.images.length > 0" class="text-center">
                <p class="text-xs text-cyan-600 font-medium">{{ form.images.length }}/5 images uploaded</p>
              </div>
            </div>
          </div>

          <!-- Right Section - Information -->
          <div class="w-3/5 p-4 bg-gray-50 flex flex-col" style="max-height: calc(95vh - 80px);">
            <div class="overflow-y-auto space-y-4">
              <!-- Title Section -->
              <div class="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                <h3 class="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <svg class="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                  Listing Title
                </h3>

                <div>
                  <label class="block text-xs font-semibold text-gray-700 mb-2">Title *</label>
                  <input v-model="form.title" type="text" maxlength="100"
                    :class="`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors ${errors.title ? 'border-red-300' : 'border-gray-300'}`"
                    placeholder="e.g., Premium Angus Cattle for Sale - Healthy & Vaccinated" required />
                  <p v-if="errors.title" class="text-red-500 text-xs mt-1">{{ errors.title }}</p>
                  <p class="text-xs text-gray-500 mt-1">{{ form.title.length }}/100 characters</p>
                </div>
              </div>

              <!-- Description -->
              <div class="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                <h3 class="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <svg class="w-4 h-4 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Description
                </h3>

                <textarea v-model="form.description" rows="3" maxlength="1000"
                  :class="`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 resize-none transition-colors ${errors.description ? 'border-red-300' : 'border-gray-300'}`"
                  placeholder="Provide detailed information about your livestock including feeding, housing, health records, breeding history, etc."
                  required></textarea>
                <p v-if="errors.description" class="text-red-500 text-xs mt-1">{{ errors.description }}</p>
                <p class="text-xs text-gray-500 mt-1">{{ form.description.length }}/1000 characters</p>
              </div>

              <!-- Basic Information -->
              <div class="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                <h3 class="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <svg class="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Basic Information
                </h3>

                <div class="grid grid-cols-2 gap-3">
                  <!-- Animal Type with Datalist -->
                  <div>
                    <label class="block text-xs font-semibold text-gray-700 mb-1">
                      Animal Type * 
                      <span class="text-gray-500 font-normal">(Type or select)</span>
                    </label>
                    <input 
                      v-model="form.type" 
                      list="animal-types" 
                      type="text"
                      @input="updateAvailableBreeds"
                      :class="`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors ${errors.type ? 'border-red-300' : 'border-gray-300'}`"
                      placeholder="Type or select animal type" 
                      required />
                    <datalist id="animal-types">
                      <option value="Cattle">Cattle</option>
                      <option value="Goat">Goat</option>
                      <option value="Pig">Pig</option>
                      <option value="Chicken">Chicken</option>
                      <option value="Duck">Duck</option>
                      <option value="Carabao">Carabao</option>
                      <option value="Sheep">Sheep</option>
                      <option value="Horse">Horse</option>
                    </datalist>
                    <p v-if="errors.type" class="text-red-500 text-xs mt-1">{{ errors.type }}</p>
                  </div>

                  <!-- Breed with Datalist -->
                  <div>
                    <label class="block text-xs font-semibold text-gray-700 mb-1">
                      Breed * 
                      <span class="text-gray-500 font-normal">(Type or select)</span>
                    </label>
                    <input 
                      v-model="form.breed" 
                      :list="form.type ? 'breed-options' : ''"
                      type="text"
                      :class="`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors ${errors.breed ? 'border-red-300' : 'border-gray-300'}`"
                      :placeholder="form.type ? 'Type or select breed' : 'Select animal type first'" 
                      required />
                    <datalist v-if="availableBreeds.length > 0" id="breed-options">
                      <option v-for="breed in availableBreeds" :key="breed" :value="breed">{{ breed }}</option>
                    </datalist>
                    <p v-if="errors.breed" class="text-red-500 text-xs mt-1">{{ errors.breed }}</p>
                  </div>

                  <!-- Gender -->
                  <div>
                    <label class="block text-xs font-semibold text-gray-700 mb-1">Gender *</label>
                    <select v-model="form.gender"
                      :class="`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors ${errors.gender ? 'border-red-300' : 'border-gray-300'}`"
                      required>
                      <option value="">Select gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Mixed">Mixed</option>
                    </select>
                    <p v-if="errors.gender" class="text-red-500 text-xs mt-1">{{ errors.gender }}</p>
                  </div>

                  <!-- Age with Datalist -->
                  <div>
                    <label class="block text-xs font-semibold text-gray-700 mb-1">
                      Age * 
                      <span class="text-gray-500 font-normal">(Type or select)</span>
                    </label>
                    <input 
                      v-model="form.age" 
                      list="age-options" 
                      type="text"
                      :class="`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors ${errors.age ? 'border-red-300' : 'border-gray-300'}`"
                      placeholder="Type or select age" 
                      required />
                    <datalist id="age-options">
                      <option value="0-3 months">0-3 months</option>
                      <option value="3-6 months">3-6 months</option>
                      <option value="6-12 months">6-12 months</option>
                      <option value="1-2 years">1-2 years</option>
                      <option value="2-4 years">2-4 years</option>
                      <option value="4-6 years">4-6 years</option>
                      <option value="6+ years">6+ years</option>
                      <option value="Mixed ages">Mixed ages</option>
                    </datalist>
                    <p v-if="errors.age" class="text-red-500 text-xs mt-1">{{ errors.age }}</p>
                  </div>
                </div>
              </div>

              <!-- Physical Details -->
              <div class="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                <h3 class="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <svg class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  Physical Details & Pricing
                </h3>

                <!-- Grid Layout -->
                <div class="grid grid-cols-2 gap-3">
                  <!-- Weight with Unit -->
                  <div>
                    <label class="block text-xs font-semibold text-gray-700 mb-1">Weight *</label>
                    <div class="flex gap-2">
                      <input v-model.number="form.weight" type="number" min="0" step="0.1"
                        :class="`flex-1 px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${errors.weight ? 'border-red-300' : 'border-gray-300'}`"
                        placeholder="Weight" required />
                      <select v-model="form.weightUnit"
                        class="w-20 px-2 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                        <option value="kg">kg</option>
                        <option value="lbs">lbs</option>
                        <option value="g">g</option>
                      </select>
                    </div>
                    <p v-if="errors.weight" class="text-red-500 text-xs mt-1">{{ errors.weight }}</p>
                  </div>

                  <!-- Quantity -->
                  <div>
                    <label class="block text-xs font-semibold text-gray-700 mb-1">Quantity *</label>
                    <input v-model.number="form.quantity" type="number" min="1"
                      :class="`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${errors.quantity ? 'border-red-300' : 'border-gray-300'}`"
                      placeholder="Quantity" required />
                    <p v-if="errors.quantity" class="text-red-500 text-xs mt-1">{{ errors.quantity }}</p>
                  </div>

                  <!-- Price with Unit -->
                  <div>
                    <label class="block text-xs font-semibold text-gray-700 mb-1">Price (₱) *</label>
                    <div class="flex gap-2">
                      <input v-model.number="form.price" type="number" min="0" step="0.01"
                        :class="`flex-1 px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${errors.price ? 'border-red-300' : 'border-gray-300'}`"
                        placeholder="Price" required />
                      <select v-model="form.priceUnit"
                        class="px-2 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                        <option value="per head">per head</option>
                        <option value="per kg">per kg</option>
                        <option value="per lbs">per lbs</option>
                        <option value="total">total</option>
                      </select>
                    </div>
                    <p v-if="errors.price" class="text-red-500 text-xs mt-1">{{ errors.price }}</p>
                  </div>

                  <!-- Location -->
                  <div>
                    <label class="block text-xs font-semibold text-gray-700 mb-1">Location *</label>
                    <input v-model="form.location" type="text"
                      :class="`w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${errors.location ? 'border-red-300' : 'border-gray-300'}`"
                      placeholder="e.g., Pampanga, Bulacan" required />
                    <p v-if="errors.location" class="text-red-500 text-xs mt-1">{{ errors.location }}</p>
                  </div>
                </div>

                <!-- Total Value -->
                <div class="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <p class="text-xs font-medium text-green-800">
                    <span v-if="form.priceUnit === 'per head'">
                      Total Value: <span class="text-sm font-bold">₱{{ ((form.price || 0) * (form.quantity || 0)).toLocaleString() }}</span>
                    </span>
                    <span v-else-if="form.priceUnit === 'total'">
                      Total: <span class="text-sm font-bold">₱{{ (form.price || 0).toLocaleString() }}</span>
                    </span>
                    <span v-else>
                      Price: <span class="text-sm font-bold">₱{{ (form.price || 0).toLocaleString() }} {{ form.priceUnit }}</span>
                    </span>
                  </p>
                </div>
              </div>

              <!-- Health Status -->
              <div class="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                <h3 class="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <svg class="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  Health Status
                </h3>

                <div class="grid grid-cols-2 gap-2">
                  <label v-for="option in healthOptions" :key="option"
                    class="flex items-center gap-2 cursor-pointer p-2 rounded-lg hover:bg-gray-50 transition-colors border border-gray-200">
                    <input type="checkbox" :value="option" v-model="form.healthStatus"
                      class="w-3 h-3 text-red-600 border-gray-300 rounded focus:ring-red-500" />
                    <span class="text-xs font-medium text-gray-700">{{ option }}</span>
                  </label>
                </div>
              </div>

              <!-- Delivery Options -->
              <div class="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                <h3 class="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <svg class="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                  Delivery Options
                </h3>

                <div class="space-y-2">
                  <label v-for="option in deliveryOptions" :key="option.value"
                    class="flex items-start gap-2 cursor-pointer p-2 rounded-lg hover:bg-gray-50 transition-colors border border-gray-200">
                    <input type="checkbox" :value="option.value" v-model="form.deliveryOptions"
                      class="w-3 h-3 text-orange-600 border-gray-300 rounded focus:ring-orange-500 mt-1" />
                    <div>
                      <span class="text-xs font-medium text-gray-700 block">{{ option.label }}</span>
                      <p class="text-xs text-gray-500 mt-0.5">{{ option.description }}</p>
                    </div>
                  </label>
                </div>
              </div>

              <!-- Payment Methods -->
              <div class="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                <h3 class="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <svg class="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                  Payment Methods
                </h3>

                <div class="space-y-2">
                  <label v-for="option in paymentMethodOptions" :key="option.value"
                    :class="`flex items-start gap-2 p-3 rounded-lg transition-all border-2 ${
                      option.available 
                        ? 'cursor-pointer hover:bg-purple-50 border-gray-200 hover:border-purple-300' 
                        : 'cursor-not-allowed bg-gray-50 border-gray-200 opacity-60'
                    }`">
                    <input 
                      type="checkbox" 
                      :value="option.value" 
                      v-model="form.paymentMethods"
                      :disabled="!option.available"
                      class="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500 mt-0.5 disabled:cursor-not-allowed disabled:opacity-50" />
                    <div class="flex-1">
                      <div class="flex items-center gap-2">
                        <span :class="`text-sm font-semibold ${option.available ? 'text-gray-900' : 'text-gray-500'}`">
                          {{ option.label }}
                        </span>
                        <span v-if="!option.available" 
                          class="px-2 py-0.5 bg-gray-200 text-gray-600 text-xs rounded-full font-medium">
                          Coming Soon
                        </span>
                        <span v-else 
                          class="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full font-medium">
                          Available
                        </span>
                      </div>
                      <p class="text-xs text-gray-500 mt-1">{{ option.description }}</p>
                    </div>
                  </label>
                </div>

                <!-- Payment Methods Info -->
                <div class="mt-3 p-3 bg-purple-50 border border-purple-200 rounded-lg">
                  <div class="flex items-start gap-2">
                    <svg class="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <p class="text-xs font-semibold text-purple-900">Payment Method Note:</p>
                      <p class="text-xs text-purple-700 mt-1">
                        Additional payment methods (Bank Transfer, GCash, PayMaya) will be available soon. For now, only Cash on Hand transactions are supported.
                      </p>
                    </div>
                  </div>
                </div>

                <!-- Validation Error -->
                <p v-if="errors.paymentMethods" class="text-red-500 text-xs mt-2">{{ errors.paymentMethods }}</p>
              </div>
            </div>

            <!-- Action Buttons - Sticky at the bottom -->
            <div class="sticky bottom-0 pt-4 bg-gray-50 mt-auto">
              <div class="flex gap-3 justify-center">
                <button type="submit" :disabled="isSubmitting"
                  class="px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 disabled:from-gray-400 disabled:to-gray-500 text-white rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl text-sm flex items-center justify-center gap-2 disabled:cursor-not-allowed">
                  <svg v-if="isSubmitting" class="animate-spin -ml-1 mr-2 h-3 w-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l-3-2.647z"></path>
                  </svg>
                  <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  {{ isSubmitting ? 'Creating...' : 'Create Listing' }}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { LivestockService } from '@/services/livestockService'
import { supabase } from '@/supabase'  
import type { CreateListingForm } from '@/types/managementTypes'

// Interfaces
interface FormErrors {
  [key: string]: string
}

interface DeliveryOption {
  value: string
  label: string
  description: string
}

interface PaymentMethodOption {
  value: string
  label: string
  description: string
  available: boolean
}

defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits<{
  close: []
  created: []
}>()

// Reactive data
const isSubmitting = ref(false)
const submitError = ref('')
const selectedImageIndex = ref(0)
const availableBreeds = ref<string[]>([])
const uploadingImages = ref(false)
const imageFiles = ref<File[]>([])

const form = reactive<CreateListingForm>({
  title: '',
  type: '',
  breed: '',
  gender: '',
  age: '',
  weight: 0,
  weightUnit: 'kg',
  quantity: 1,
  status: 'Available',
  healthStatus: [],
  price: 0,
  priceUnit: 'per head',
  location: '',
  deliveryOptions: [],
  paymentMethods: [],
  images: [],
  description: ''
})

const errors = ref<FormErrors>({})

// Options
const healthOptions: readonly string[] = [
  'Vaccinated',
  'Dewormed',
  'Health Certificate',
  'Pregnant',
  'Lactating',
  'Disease Free',
  'Quarantined'
] as const

const deliveryOptions: readonly DeliveryOption[] = [
  {
    value: 'pickup',
    label: 'Buyer Pickup',
    description: 'Buyer arranges pickup from farm location'
  },
  {
    value: 'delivery',
    label: 'Farm Delivery',
    description: 'We deliver to buyer location (additional fees may apply)'
  },
  {
    value: 'meetup',
    label: 'Meetup Point',
    description: 'Meet at agreed location between farm and buyer'
  }
] as const

const paymentMethodOptions: readonly PaymentMethodOption[] = [
  {
    value: 'cash',
    label: 'Cash on Hand',
    description: 'Accept cash payment upon delivery or pickup',
    available: true
  },
  {
    value: 'bank_transfer',
    label: 'Bank Transfer',
    description: 'Accept payments via bank transfer',
    available: false
  },
  {
    value: 'gcash',
    label: 'GCash',
    description: 'Accept payments through GCash mobile wallet',
    available: false
  },
  {
    value: 'paymaya',
    label: 'PayMaya',
    description: 'Accept payments through PayMaya digital wallet',
    available: false
  }
] as const

// Breed mapping
const breedsByAnimalType: Record<string, readonly string[]> = {
  'Cattle': [
    'Angus', 'Holstein', 'Brahman', 'Charolais', 'Simmental', 'Hereford',
    'Limousin', 'Wagyu', 'Native/Local Breed', 'Crossbred', 'Other'
  ] as const,
  'Goat': [
    'Boer', 'Nubian', 'Saanen', 'Alpine', 'LaMancha', 'Toggenburg',
    'Nigerian Dwarf', 'Kiko', 'Spanish', 'Native/Local Breed', 'Crossbred', 'Other'
  ] as const,
  'Pig': [
    'Yorkshire', 'Landrace', 'Duroc', 'Hampshire', 'Berkshire', 'Chester White',
    'Poland China', 'Pietrain', 'Large White', 'Native/Local Breed', 'Crossbred', 'Other'
  ] as const,
  'Chicken': [
    'Rhode Island Red', 'Leghorn', 'Plymouth Rock', 'Brahma', 'Orpington', 'Wyandotte',
    'Sussex', 'Marans', 'Australorp', 'Native/Local Breed', 'Broiler', 'Layer',
    'Dual Purpose', 'Other'
  ] as const,
  'Duck': [
    'Pekin', 'Mallard', 'Rouen', 'Khaki Campbell', 'Runner', 'Muscovy',
    'Call Duck', 'Cayuga', 'Swedish Blue', 'Native/Local Breed', 'Other'
  ] as const,
  'Carabao': [
    'Murrah', 'Nili-Ravi', 'Surti', 'Jaffarabadi',
    'Native Carabao', 'Crossbred', 'Other'
  ] as const,
  'Sheep': [
    'Dorper', 'Merino', 'Suffolk', 'Hampshire', 'Romney', 'Border Leicester',
    'Corriedale', 'Rambouillet', 'Katahdin', 'Native/Local Breed', 'Crossbred', 'Other'
  ] as const,
  'Horse': [
    'Arabian', 'Thoroughbred', 'Quarter Horse', 'Paint', 'Appaloosa', 'Mustang',
    'Clydesdale', 'Percheron', 'Friesian', 'Native/Local Breed', 'Other'
  ] as const
}

// Methods
const updateAvailableBreeds = (): void => {
  if (form.type && breedsByAnimalType[form.type]) {
    availableBreeds.value = [...breedsByAnimalType[form.type]]
  } else {
    availableBreeds.value = []
  }
}

const validateForm = (): boolean => {
  errors.value = {}
  let isValid = true

  if (!form.title || form.title.length < 5) {
    errors.value.title = 'Title must be at least 5 characters'
    isValid = false
  }

  if (form.title.length > 100) {
    errors.value.title = 'Title must be less than 100 characters'
    isValid = false
  }

  if (!form.type) {
    errors.value.type = 'Animal type is required'
    isValid = false
  }

  if (!form.breed) {
    errors.value.breed = 'Breed is required'
    isValid = false
  }

  if (!form.gender) {
    errors.value.gender = 'Gender is required'
    isValid = false
  }

  if (!form.age) {
    errors.value.age = 'Age is required'
    isValid = false
  }

  if (!form.weight || form.weight <= 0) {
    errors.value.weight = 'Valid weight is required'
    isValid = false
  }

  if (!form.quantity || form.quantity <= 0) {
    errors.value.quantity = 'Valid quantity is required'
    isValid = false
  }

  if (!form.price || form.price <= 0) {
    errors.value.price = 'Valid price is required'
    isValid = false
  }

  if (!form.location) {
    errors.value.location = 'Location is required'
    isValid = false
  }

  if (!form.description || form.description.length < 10) {
    errors.value.description = 'Description must be at least 10 characters'
    isValid = false
  }

  if (form.description.length > 1000) {
    errors.value.description = 'Description must be less than 1000 characters'
    isValid = false
  }

  if (form.paymentMethods.length === 0) {
    errors.value.paymentMethods = 'Please select at least one payment method'
    isValid = false
  }

  return isValid
}

const handleSubmit = async (): Promise<void> => {
  submitError.value = ''
  
  if (!validateForm()) {
    return
  }

  isSubmitting.value = true

  try {
    console.log('🚀 Submitting new listing...')

    // Upload images to Supabase Storage first
    if (imageFiles.value.length > 0) {
      uploadingImages.value = true
      
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        throw new Error('User not authenticated')
      }

      console.log('📤 Uploading images to storage...')
      const uploadResult = await LivestockService.uploadImages(imageFiles.value, user.id)
      
      if (!uploadResult.success || !uploadResult.urls) {
        throw new Error(uploadResult.error || 'Failed to upload images')
      }

      // Update form with uploaded image URLs
      form.images = uploadResult.urls
      uploadingImages.value = false
      
      console.log('✅ Images uploaded successfully:', uploadResult.urls)
    }

    // Create the listing with image URLs
    const result = await LivestockService.createListing(form)

    if (result.success) {
      console.log('✅ Listing created successfully:', result.data)
      resetForm()
      emit('created')
      emit('close')
    } else {
      console.error('❌ Failed to create listing:', result.error)
      submitError.value = result.error || 'Failed to create listing. Please try again.'
      
      // CLEANUP: If listing creation failed but images were uploaded, delete them
      if (form.images.length > 0) {
        console.log('🧹 Cleaning up uploaded images due to listing creation failure...')
        await LivestockService.deleteImages(form.images)
      }
    }
  } catch (error: any) {
    console.error('❌ Error creating listing:', error)
    submitError.value = error.message || 'An unexpected error occurred. Please try again.'
    
    // CLEANUP: If error occurred but images were uploaded, delete them
    if (form.images.length > 0) {
      console.log('🧹 Cleaning up uploaded images due to error...')
      await LivestockService.deleteImages(form.images)
    }
  } finally {
    isSubmitting.value = false
    uploadingImages.value = false
  }
}

const closeModal = (): void => {
  if (!isSubmitting.value) {
    resetForm()
    submitError.value = ''
    emit('close')
  }
}

const resetForm = (): void => {
  Object.assign(form, {
    title: '',
    type: '',
    breed: '',
    gender: '',
    age: '',
    weight: 0,
    weightUnit: 'kg',
    quantity: 1,
    status: 'Available',
    healthStatus: [],
    price: 0,
    priceUnit: 'per head',
    location: '',
    deliveryOptions: [],
    paymentMethods: [],
    images: [],
    description: ''
  })
  
  imageFiles.value = []
  errors.value = {}
  selectedImageIndex.value = 0
  availableBreeds.value = []
}

const handleImageUpload = (event: Event): void => {
  const target = event.target as HTMLInputElement
  const files = target.files
  if (!files) return

  Array.from(files).forEach(file => {
    if (imageFiles.value.length >= 5) {
      alert('Maximum 5 images allowed')
      return
    }

    if (file.size > 10 * 1024 * 1024) {
      alert('File size must be less than 10MB')
      return
    }

    if (!file.type.startsWith('image/')) {
      alert('Please select only image files')
      return
    }

    // Store the actual File object
    imageFiles.value.push(file)

    // Create preview URL for display
    const reader = new FileReader()
    reader.onload = (e) => {
      if (e.target?.result) {
        form.images.push(e.target.result as string)
      }
    }
    reader.readAsDataURL(file)
  })

  target.value = ''
}

const removeImage = (index: number): void => {
  form.images.splice(index, 1)
  imageFiles.value.splice(index, 1)
  
  if (selectedImageIndex.value >= form.images.length) {
    selectedImageIndex.value = Math.max(0, form.images.length - 1)
  }
}

const previousImage = (): void => {
  selectedImageIndex.value = selectedImageIndex.value > 0
    ? selectedImageIndex.value - 1
    : form.images.length - 1
}

const nextImage = (): void => {
  selectedImageIndex.value = selectedImageIndex.value < form.images.length - 1
    ? selectedImageIndex.value + 1
    : 0
}
</script>