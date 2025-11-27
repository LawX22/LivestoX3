<!-- EditAnimalModal.vue - UPDATED VERSION (uses encoded delivery_options) -->
<template>
  <div v-if="isOpen && animal" class="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/50 backdrop-blur-sm">
    <div class="bg-white rounded-xl shadow-2xl max-w-6xl w-full max-h-[95vh] overflow-hidden transform transition-all duration-300">
      
      <!-- Header -->
      <div class="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white p-4 border-b border-blue-200">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            <div>
              <h2 class="text-lg font-bold text-white">Edit Animal Listing</h2>
              <p class="text-blue-100 text-xs">Update livestock information and details</p>
            </div>
          </div>
          <button @click="handleClose" :disabled="isSaving"
            class="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer">
            <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Error Alert -->
      <div v-if="saveError" class="bg-red-50 border-l-4 border-red-500 p-4 m-4">
        <div class="flex items-start">
          <svg class="w-5 h-5 text-red-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <h3 class="text-sm font-semibold text-red-800">Error Updating Listing</h3>
            <p class="text-sm text-red-700 mt-1">{{ saveError }}</p>
          </div>
          <button @click="saveError = ''" class="ml-auto text-red-500 hover:text-red-700 cursor-pointer">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Validation Error Alert -->
      <div v-if="validationError" class="bg-yellow-50 border-l-4 border-yellow-500 p-4 m-4 animate-shake">
        <div class="flex items-start">
          <svg class="w-5 h-5 text-yellow-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <div>
            <h3 class="text-sm font-semibold text-yellow-800">Missing Required Fields</h3>
            <p class="text-sm text-yellow-700 mt-1">{{ validationError }}</p>
          </div>
          <button @click="validationError = ''" class="ml-auto text-yellow-500 hover:text-yellow-700 cursor-pointer">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Main Content -->
      <div class="overflow-y-auto max-h-[calc(95vh-80px)]" ref="editFormScrollContainer">
        <form @submit.prevent="handleSave" class="flex">
          
          <!-- Left Section - Image Management -->
          <div class="w-2/5 bg-gradient-to-br from-slate-50 to-gray-100 p-4 border-r border-gray-200">
            <div class="sticky top-0 space-y-4">
              <div class="text-center">
                <h3 class="text-base font-bold text-gray-900 mb-1 flex items-center justify-center gap-2">
                  <svg class="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 002 2z" />
                  </svg>
                  Manage Images
                </h3>
                <p class="text-xs text-gray-500">Upload and organize livestock photos</p>
              </div>

              <!-- Image Upload Area -->
              <div ref="imagesField" 
                :class="`border-2 border-dashed rounded-lg p-4 text-center transition-all duration-300 ${
                  fieldErrors.images 
                    ? 'border-red-400 bg-red-50 animate-shake' 
                    : 'border-gray-300 hover:border-blue-400'
                }`">
                <label class="cursor-pointer block">
                  <input type="file" multiple accept="image/*" @change="handleImageUpload" class="hidden" ref="fileInput">
                  <svg class="w-8 h-8 mx-auto text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  <p class="text-sm text-gray-600 mb-2">Click to upload images</p>
                  <p class="text-xs text-gray-500">PNG, JPG up to 10MB each</p>
                  <p v-if="fieldErrors.images" class="text-xs text-red-600 mt-2 font-semibold">
                    {{ fieldErrors.images }}
                  </p>
                </label>
              </div>

              <!-- Main Image Preview -->
              <div class="relative">
                <div class="w-full h-64 bg-gray-100 rounded-lg border border-gray-300 flex items-center justify-center overflow-hidden">
                  <div v-if="editForm.images.length === 0" class="text-center text-gray-400">
                    <svg class="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 002 2z" />
                    </svg>
                    <p class="text-sm">No images uploaded</p>
                  </div>
                  <img v-else :src="editForm.images[selectedImageIndex]" alt="Preview" 
                    class="w-full h-full object-cover rounded-lg" />
                </div>

                <!-- Navigation arrows -->
                <div v-if="editForm.images.length > 1" class="absolute inset-y-0 left-0 flex items-center">
                  <button @click="previousImage" type="button"
                    class="ml-2 w-8 h-8 bg-black/60 hover:bg-black/80 text-white rounded-full flex items-center justify-center transition-all duration-200 shadow-lg cursor-pointer">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                </div>
                <div v-if="editForm.images.length > 1" class="absolute inset-y-0 right-0 flex items-center">
                  <button @click="nextImage" type="button"
                    class="mr-2 w-8 h-8 bg-black/60 hover:bg-black/80 text-white rounded-full flex items-center justify-center transition-all duration-200 shadow-lg cursor-pointer">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>

              <!-- Thumbnail Gallery -->
              <div v-if="editForm.images.length > 0" class="grid grid-cols-5 gap-2">
                <div v-for="(image, index) in editForm.images" :key="index"
                  class="relative group cursor-pointer" @click="selectedImageIndex = index">
                  <img :src="image" :alt="`Thumbnail ${index + 1}`"
                    :class="`w-full h-14 object-cover rounded-lg border-2 transition-all ${selectedImageIndex === index ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200 hover:border-gray-400'}`" />
                  <!-- Remove button -->
                  <button @click.stop="removeImage(index)" type="button"
                    class="absolute -top-1 -right-1 w-5 h-5 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              <!-- Image Counter -->
              <div class="text-center" v-if="editForm.images.length > 0">
                <p class="text-xs text-slate-600 font-medium">{{ selectedImageIndex + 1 }}/{{ editForm.images.length }} images</p>
              </div>
            </div>
          </div>

          <!-- Right Section - Form Fields -->
          <div class="w-3/5 p-4 bg-gray-50 flex flex-col">
            <div class="overflow-y-auto space-y-4">
              
              <!-- Basic Information -->
              <div class="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                <h3 class="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <svg class="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Basic Information
                </h3>

                <div class="space-y-4">
                  <!-- Title and Description -->
                  <div class="grid grid-cols-1 gap-4">
                    <div ref="titleField">
                      <label class="block text-xs font-semibold text-gray-700 mb-2">
                        Title <span class="text-red-500">*</span>
                      </label>
                      <input v-model="editForm.title" type="text" 
                        :class="`w-full px-3 py-2 border rounded-lg text-sm transition-all duration-300 ${
                          fieldErrors.title 
                            ? 'border-red-500 focus:ring-2 focus:ring-red-500 focus:border-red-500 animate-shake' 
                            : 'border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                        }`"
                        @input="clearFieldError('title')">
                      <p v-if="fieldErrors.title" class="text-xs text-red-600 mt-1">{{ fieldErrors.title }}</p>
                    </div>
                    
                    <div ref="descriptionField">
                      <label class="block text-xs font-semibold text-gray-700 mb-2">
                        Description <span class="text-red-500">*</span>
                      </label>
                      <textarea v-model="editForm.description" rows="3"
                        :class="`w-full px-3 py-2 border rounded-lg text-sm transition-all duration-300 ${
                          fieldErrors.description 
                            ? 'border-red-500 focus:ring-2 focus:ring-red-500 focus:border-red-500 animate-shake' 
                            : 'border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                        }`"
                        @input="clearFieldError('description')"></textarea>
                      <p v-if="fieldErrors.description" class="text-xs text-red-600 mt-1">{{ fieldErrors.description }}</p>
                    </div>
                  </div>

                  <!-- Animal Details Grid -->
                  <div class="grid grid-cols-2 gap-4">
                    <div ref="typeField">
                      <label class="block text-xs font-semibold text-gray-700 mb-2">
                        Animal Type <span class="text-red-500">*</span>
                        <span class="text-gray-500 font-normal">(Type or select)</span>
                      </label>
                      <input 
                        v-model="editForm.type" 
                        list="edit-animal-types" 
                        type="text"
                        @input="updateAvailableBreeds(); clearFieldError('type')"
                        :class="`w-full px-3 py-2 text-sm border rounded-lg transition-all duration-300 ${
                          fieldErrors.type 
                            ? 'border-red-500 focus:ring-2 focus:ring-red-500 focus:border-red-500 animate-shake' 
                            : 'border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                        }`"
                        placeholder="Type or select animal type" />
                      <datalist id="edit-animal-types">
                        <option value="Cattle">Cattle</option>
                        <option value="Goat">Goat</option>
                        <option value="Pig">Pig</option>
                        <option value="Chicken">Chicken</option>
                        <option value="Duck">Duck</option>
                        <option value="Carabao">Carabao</option>
                        <option value="Sheep">Sheep</option>
                        <option value="Horse">Horse</option>
                      </datalist>
                      <p v-if="fieldErrors.type" class="text-xs text-red-600 mt-1">{{ fieldErrors.type }}</p>
                    </div>
                    
                    <div ref="breedField">
                      <label class="block text-xs font-semibold text-gray-700 mb-2">
                        Breed <span class="text-red-500">*</span>
                        <span class="text-gray-500 font-normal">(Type or select)</span>
                      </label>
                      <input 
                        v-model="editForm.breed" 
                        :list="editForm.type ? 'edit-breed-options' : ''"
                        type="text"
                        @input="clearFieldError('breed')"
                        :class="`w-full px-3 py-2 text-sm border rounded-lg transition-all duration-300 ${
                          fieldErrors.breed 
                            ? 'border-red-500 focus:ring-2 focus:ring-red-500 focus:border-red-500 animate-shake' 
                            : 'border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                        }`"
                        :placeholder="editForm.type ? 'Type or select breed' : 'Select animal type first'" />
                      <datalist v-if="availableBreeds.length > 0" id="edit-breed-options">
                        <option v-for="breed in availableBreeds" :key="breed" :value="breed">{{ breed }}</option>
                      </datalist>
                      <p v-if="fieldErrors.breed" class="text-xs text-red-600 mt-1">{{ fieldErrors.breed }}</p>
                    </div>
                    
                    <div ref="genderField">
                      <label class="block text-xs font-semibold text-gray-700 mb-2">
                        Gender <span class="text-red-500">*</span>
                      </label>
                      <select v-model="editForm.gender" 
                        @change="clearFieldError('gender')"
                        :class="`w-full px-3 py-2 border rounded-lg text-sm cursor-pointer transition-all duration-300 ${
                          fieldErrors.gender 
                            ? 'border-red-500 focus:ring-2 focus:ring-red-500 focus:border-red-500 animate-shake' 
                            : 'border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                        }`">
                        <option value="">Select gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Mixed">Mixed</option>
                      </select>
                      <p v-if="fieldErrors.gender" class="text-xs text-red-600 mt-1">{{ fieldErrors.gender }}</p>
                    </div>
                    
                    <div ref="ageField">
                      <label class="block text-xs font-semibold text-gray-700 mb-2">
                        Age <span class="text-red-500">*</span>
                        <span class="text-gray-500 font-normal">(Type or select)</span>
                      </label>
                      <input 
                        v-model="editForm.age" 
                        list="edit-age-options" 
                        type="text"
                        @input="clearFieldError('age')"
                        :class="`w-full px-3 py-2 text-sm border rounded-lg transition-all duration-300 ${
                          fieldErrors.age 
                            ? 'border-red-500 focus:ring-2 focus:ring-red-500 focus:border-red-500 animate-shake' 
                            : 'border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                        }`"
                        placeholder="Type or select age" />
                      <datalist id="edit-age-options">
                        <option value="0-3 months">0-3 months</option>
                        <option value="3-6 months">3-6 months</option>
                        <option value="6-12 months">6-12 months</option>
                        <option value="1-2 years">1-2 years</option>
                        <option value="2-4 years">2-4 years</option>
                        <option value="4-6 years">4-6 years</option>
                        <option value="6+ years">6+ years</option>
                        <option value="Mixed ages">Mixed ages</option>
                      </datalist>
                      <p v-if="fieldErrors.age" class="text-xs text-red-600 mt-1">{{ fieldErrors.age }}</p>
                    </div>
                    
                    <div ref="weightField">
                      <label class="block text-xs font-semibold text-gray-700 mb-2">
                        Weight <span class="text-red-500">*</span>
                      </label>
                      <div class="flex gap-2">
                        <input v-model.number="editForm.weight" type="number" min="0" step="0.1"
                          @input="clearFieldError('weight')"
                          :class="`flex-1 px-3 py-2 border rounded-lg text-sm transition-all duration-300 ${
                            fieldErrors.weight 
                              ? 'border-red-500 focus:ring-2 focus:ring-red-500 focus:border-red-500 animate-shake' 
                              : 'border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                          }`">
                        <select v-model="editForm.weightUnit"
                          class="w-20 px-2 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer">
                          <option value="kg">kg</option>
                          <option value="lbs">lbs</option>
                          <option value="g">g</option>
                        </select>
                      </div>
                      <p v-if="fieldErrors.weight" class="text-xs text-red-600 mt-1">{{ fieldErrors.weight }}</p>
                    </div>
                    
                    <div ref="quantityField">
                      <label class="block text-xs font-semibold text-gray-700 mb-2">
                        Quantity <span class="text-red-500">*</span>
                      </label>
                      <input v-model.number="editForm.quantity" type="number" min="1"
                        @input="clearFieldError('quantity')"
                        :class="`w-full px-3 py-2 border rounded-lg text-sm transition-all duration-300 ${
                          fieldErrors.quantity 
                            ? 'border-red-500 focus:ring-2 focus:ring-red-500 focus:border-red-500 animate-shake' 
                            : 'border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                        }`">
                      <p v-if="fieldErrors.quantity" class="text-xs text-red-600 mt-1">{{ fieldErrors.quantity }}</p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Health and Status -->
              <div class="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                <h3 class="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <svg class="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Health & Status
                </h3>

                <div class="space-y-4">
                  <div class="grid grid-cols-2 gap-4">
                    <div>
                      <label class="block text-xs font-semibold text-gray-700 mb-2">Status</label>
                      <select v-model="editForm.status" 
                        class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm cursor-pointer">
                        <option value="Available">Available</option>
                        <option value="Low Stock">Low Stock</option>
                        <option value="Out of Stock">Out of Stock</option>
                      </select>
                    </div>
                    
                    <div ref="priceField">
                      <label class="block text-xs font-semibold text-gray-700 mb-2">
                        Price (₱) <span class="text-red-500">*</span>
                      </label>
                      <div class="flex gap-2">
                        <input v-model.number="editForm.price" type="number" min="0" step="0.01"
                          @input="clearFieldError('price')"
                          :class="`flex-1 px-3 py-2 border rounded-lg text-sm transition-all duration-300 ${
                            fieldErrors.price 
                              ? 'border-red-500 focus:ring-2 focus:ring-red-500 focus:border-red-500 animate-shake' 
                              : 'border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                          }`">
                        <select v-model="editForm.priceUnit"
                          class="px-2 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer">
                          <option value="per head">per head</option>
                          <option value="per kg">per kg</option>
                          <option value="per lbs">per lbs</option>
                          <option value="total">total</option>
                        </select>
                      </div>
                      <p v-if="fieldErrors.price" class="text-xs text-red-600 mt-1">{{ fieldErrors.price }}</p>
                    </div>
                  </div>

                  <!-- Health Status -->
                  <div>
                    <label class="block text-xs font-semibold text-gray-700 mb-2">Health Status</label>
                    <div class="space-y-2">
                      <div v-for="status in healthStatusOptions" :key="status" class="flex items-center">
                        <input :id="`edit-${status}`" v-model="editForm.healthStatus" :value="status" type="checkbox" 
                          class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer">
                        <label :for="`edit-${status}`" class="ml-2 text-sm text-gray-700 cursor-pointer">{{ status }}</label>
                      </div>
                    </div>
                  </div>

                  <!-- Delivery Options -->
                  <div ref="deliveryOptionsField">
                    <label class="block text-xs font-semibold text-gray-700 mb-2">
                      Delivery Options <span class="text-red-500">*</span>
                    </label>
                    <div :class="`space-y-3 transition-all duration-300 ${
                      fieldErrors.deliveryOptions 
                        ? 'p-3 bg-red-50 border border-red-300 rounded-lg animate-shake' 
                        : ''
                    }`">
                      <!-- Buyer Pickup Option -->
                      <div :class="`border-2 rounded-lg p-3 transition-all ${
                        editForm.deliveryOptions.some(opt => opt.startsWith('pickup:') || opt === 'pickup') ? 'border-orange-400 bg-orange-50' : 'border-gray-200 bg-white'
                      }`">
                        <label class="flex items-start gap-2 cursor-pointer">
                          <input type="checkbox" :checked="editForm.deliveryOptions.some(opt => opt.startsWith('pickup:') || opt === 'pickup')" @change="togglePickup"
                            @click="clearFieldError('deliveryOptions')"
                            class="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500 mt-1 cursor-pointer" />
                          <div class="flex-1">
                            <span class="text-sm font-semibold text-gray-900 block">Buyer Pickup</span>
                            <p class="text-xs text-gray-600 mt-0.5">Buyer arranges pickup from farm location</p>
                          </div>
                        </label>

                        <!-- Pickup Schedule -->
                        <div v-if="editForm.deliveryOptions.some(opt => opt.startsWith('pickup:') || opt === 'pickup')" class="mt-3 pl-6 space-y-3 border-t border-orange-200 pt-3">
                          <div>
                            <label class="block text-xs font-semibold text-gray-700 mb-2">
                              Available Days *
                              <span class="text-gray-500 font-normal">(Select all available days)</span>
                            </label>
                            <div class="grid grid-cols-4 gap-2">
                              <label v-for="day in weekDays" :key="day"
                                :class="`flex items-center justify-center gap-1 cursor-pointer p-2 rounded-lg border-2 transition-all text-xs font-medium ${
                                  pickupSchedule.availableDays.includes(day) 
                                    ? 'border-orange-500 bg-orange-100 text-orange-800' 
                                    : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                                }`">
                                <input type="checkbox" :value="day" v-model="pickupSchedule.availableDays"
                                  class="sr-only" />
                                {{ day }}
                              </label>
                            </div>
                          </div>

                          <div class="grid grid-cols-2 gap-3">
                            <div>
                              <label class="block text-xs font-semibold text-gray-700 mb-2">Start Time *</label>
                              <input v-model="pickupSchedule.startTime" type="time"
                                class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500" />
                            </div>

                            <div>
                              <label class="block text-xs font-semibold text-gray-700 mb-2">End Time *</label>
                              <input v-model="pickupSchedule.endTime" type="time"
                                class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500" />
                            </div>
                          </div>

                          <!-- Pickup Schedule Summary -->
                          <div v-if="pickupSchedule.availableDays.length > 0 && pickupSchedule.startTime && pickupSchedule.endTime"
                            class="mt-2 p-2 bg-orange-100 border border-orange-300 rounded-lg">
                            <p class="text-xs font-medium text-orange-900">
                              📅 Available: {{ pickupSchedule.availableDays.join(', ') }}
                              <br>
                              🕐 Time: {{ formatTime(pickupSchedule.startTime) }} - {{ formatTime(pickupSchedule.endTime) }}
                            </p>
                          </div>
                        </div>
                      </div>

                      <!-- Farm Delivery Option -->
                      <div :class="`border-2 rounded-lg p-3 transition-all ${
                        editForm.deliveryOptions.some(opt => opt.startsWith('delivery:') || opt === 'delivery') ? 'border-orange-400 bg-orange-50' : 'border-gray-200 bg-white'
                      }`">
                        <label class="flex items-start gap-2 cursor-pointer">
                          <input type="checkbox" :checked="editForm.deliveryOptions.some(opt => opt.startsWith('delivery:') || opt === 'delivery')" @change="toggleDelivery"
                            @click="clearFieldError('deliveryOptions')"
                            class="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500 mt-1 cursor-pointer" />
                          <div class="flex-1">
                            <span class="text-sm font-semibold text-gray-900 block">Farm Delivery</span>
                            <p class="text-xs text-gray-600 mt-0.5">We deliver to buyer location</p>
                          </div>
                        </label>

                        <!-- Delivery Fee -->
                        <div v-if="editForm.deliveryOptions.some(opt => opt.startsWith('delivery:') || opt === 'delivery')" class="mt-3 pl-6 space-y-3 border-t border-orange-200 pt-3">
                          <div>
                            <label class="block text-xs font-semibold text-gray-700 mb-2">
                              Delivery Fee (₱) *
                              <span class="text-gray-500 font-normal">(Per delivery or negotiable)</span>
                            </label>
                            <input v-model.number="deliveryFee" type="number" min="0" step="50"
                              class="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                              placeholder="e.g., 500" />
                            <p class="text-xs text-gray-500 mt-1">💡 Tip: Set to 0 for negotiable or free delivery</p>
                          </div>

                          <!-- Delivery Fee Summary -->
                          <div v-if="deliveryFee !== null && deliveryFee !== undefined"
                            class="mt-2 p-2 bg-orange-100 border border-orange-300 rounded-lg">
                            <p class="text-xs font-medium text-orange-900">
                              🚚 Delivery Fee: 
                              <span v-if="deliveryFee === 0" class="font-bold">Negotiable / Free</span>
                              <span v-else class="font-bold">₱{{ deliveryFee.toLocaleString() }}</span>
                            </p>
                          </div>
                        </div>
                      </div>

                      <!-- Meetup Point Option -->
                      <div :class="`border-2 rounded-lg p-3 transition-all ${
                        editForm.deliveryOptions.includes('meetup') ? 'border-orange-400 bg-orange-50' : 'border-gray-200 bg-white'
                      }`">
                        <label class="flex items-start gap-2 cursor-pointer">
                          <input type="checkbox" value="meetup" v-model="editForm.deliveryOptions"
                            @change="clearFieldError('deliveryOptions')"
                            class="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500 mt-1 cursor-pointer" />
                          <div class="flex-1">
                            <span class="text-sm font-semibold text-gray-900 block">Meetup Point</span>
                            <p class="text-xs text-gray-600 mt-0.5">Arrange a convenient meetup location</p>
                          </div>
                        </label>
                      </div>
                    </div>
                    <p v-if="fieldErrors.deliveryOptions" class="text-xs text-red-600 mt-1">{{ fieldErrors.deliveryOptions }}</p>
                  </div>

                  <!-- Payment Methods -->
                  <div>
                    <label class="block text-xs font-semibold text-gray-700 mb-2">Payment Methods</label>
                    <div class="space-y-2">
                      <div v-for="method in paymentMethodsMap" :key="method.value" 
                        :class="`flex items-start p-2 rounded-lg ${method.available ? 'hover:bg-gray-50 cursor-pointer' : 'bg-gray-50 opacity-60'}`">
                        <input 
                          :id="`edit-payment-${method.value}`" 
                          v-model="editForm.paymentMethods" 
                          :value="method.value" 
                          type="checkbox"
                          :disabled="!method.available"
                          class="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500 mt-0.5 cursor-pointer disabled:cursor-not-allowed" />
                        <label :for="`edit-payment-${method.value}`" :class="`ml-2 flex-1 ${method.available ? 'cursor-pointer' : ''}`">
                          <span :class="`text-sm font-medium ${method.available ? 'text-gray-700' : 'text-gray-500'}`">
                            {{ method.label }}
                          </span>
                          <span v-if="!method.available" class="ml-2 px-2 py-0.5 bg-gray-200 text-gray-600 text-xs rounded-full">
                            Coming Soon
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Location -->
              <div class="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
                <h3 class="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <svg class="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Location
                </h3>

                <div ref="locationField">
                  <label class="block text-xs font-semibold text-gray-700 mb-2">
                    Farm Location <span class="text-red-500">*</span>
                  </label>
                  <div class="relative">
                    <select v-model="editForm.location"
                      @change="clearFieldError('location')"
                      :class="`w-full px-3 py-2 border rounded-lg text-sm cursor-pointer transition-all duration-300 ${
                        fieldErrors.location 
                          ? 'border-red-500 focus:ring-2 focus:ring-red-500 focus:border-red-500 animate-shake' 
                          : 'border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                      }`">
                      <option value="">Select from your saved addresses</option>
                      <option v-for="address in userAddresses" :key="address.id" :value="formatAddress(address)">
                        {{ address.label || 'Address' }} - {{ formatAddress(address) }}
                      </option>
                      <option value="__custom__">🖊️ Enter custom location</option>
                    </select>
                    
                    <!-- Custom location input -->
                    <input 
                      v-if="editForm.location === '__custom__'" 
                      v-model="customLocation"
                      @blur="handleCustomLocation"
                      type="text"
                      class="mt-2 w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="e.g., Cebu, Bogo City" />
                  </div>
                  <p v-if="fieldErrors.location" class="text-xs text-red-600 mt-1">{{ fieldErrors.location }}</p>
                  <p v-if="userAddresses.length === 0 && !loadingAddresses" class="text-xs text-amber-600 mt-1">
                    💡 No saved addresses. Add addresses in your profile settings.
                  </p>
                </div>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="sticky bottom-0 pt-4 bg-gray-50 mt-auto">
              <div class="flex gap-3 justify-center">
                <button type="button" @click="handleClose" :disabled="isSaving"
                  class="px-6 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl text-sm flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Cancel
                </button>
                <button type="submit" :disabled="isSaving"
                  class="px-6 py-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 disabled:from-gray-400 disabled:to-gray-500 text-white rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl text-sm flex items-center justify-center gap-2 disabled:cursor-not-allowed cursor-pointer">
                  <svg v-if="isSaving" class="animate-spin -ml-1 mr-2 h-3 w-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l-3-2.647z"></path>
                  </svg>
                  <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  {{ isSaving ? 'Saving...' : 'Save Changes' }}
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
import { ref, reactive, watch } from 'vue'
import { supabase } from '@/supabase'
import { LivestockService } from '@/services/livestockService'
import { ProfileService } from '@/services/profileService'
import { parseDeliveryOptions, formatTime } from '../../views/utility/deliveryOptionsHelper.ts'
import type { Animal } from '@/types/managementTypes'
import type { Address } from '@/types/user'

const props = defineProps<{
  isOpen: boolean
  animal?: Animal | null
}>()

const emit = defineEmits<{
  close: []
  updated: []
}>()

// State
const selectedImageIndex = ref(0)
const isSaving = ref(false)
const saveError = ref('')
const uploadingImages = ref(false)
const availableBreeds = ref<string[]>([])
const validationError = ref('')
const fileInput = ref<HTMLInputElement | null>(null)
const userAddresses = ref<Address[]>([])
const loadingAddresses = ref(false)
const customLocation = ref('')
const deliveryFee = ref<number>(0)

// Pickup schedule
const pickupSchedule = reactive<{
  availableDays: string[]
  startTime: string
  endTime: string
}>({
  availableDays: [],
  startTime: '',
  endTime: ''
})

// Week days for pickup
const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] as const

// Field-specific error tracking
const fieldErrors = reactive<Record<string, string>>({
  title: '',
  description: '',
  type: '',
  breed: '',
  gender: '',
  age: '',
  weight: '',
  quantity: '',
  price: '',
  deliveryOptions: '',
  location: '',
  images: ''
})

// Refs for scrolling to fields
const editFormScrollContainer = ref<HTMLElement | null>(null)
const titleField = ref<HTMLElement | null>(null)
const descriptionField = ref<HTMLElement | null>(null)
const typeField = ref<HTMLElement | null>(null)
const breedField = ref<HTMLElement | null>(null)
const genderField = ref<HTMLElement | null>(null)
const ageField = ref<HTMLElement | null>(null)
const weightField = ref<HTMLElement | null>(null)
const quantityField = ref<HTMLElement | null>(null)
const priceField = ref<HTMLElement | null>(null)
const deliveryOptionsField = ref<HTMLElement | null>(null)
const locationField = ref<HTMLElement | null>(null)
const imagesField = ref<HTMLElement | null>(null)

const newImageFiles = ref<File[]>([])
const originalImages = ref<string[]>([])

// Initial form state for resetting
const getInitialFormState = () => ({
  title: '',
  description: '',
  type: '',
  breed: '',
  gender: '',
  age: '',
  weight: 0,
  weightUnit: 'kg',
  quantity: 1,
  status: 'Available',
  healthStatus: [] as string[],
  price: 0,
  priceUnit: 'per head',
  deliveryOptions: [] as string[],
  paymentMethods: [] as string[],
  images: [] as string[],
  location: '',
})

// Edit form data
const editForm = reactive<{
  title: string
  description: string
  type: string
  breed: string
  gender: string
  age: string
  weight: number
  weightUnit: string
  quantity: number
  status: string
  healthStatus: string[]
  price: number
  priceUnit: string
  deliveryOptions: string[]
  paymentMethods: string[]
  images: string[]
  location: string
}>(getInitialFormState())

// Options
const healthStatusOptions: readonly string[] = [
  'Vaccinated',
  'Dewormed', 
  'Health Certificate',
  'Pregnant',
  'Lactating',
  'Disease Free',
  'Quarantined'
] as const

const paymentMethodsMap: readonly { value: string; label: string; available: boolean }[] = [
  { value: 'cash', label: 'Cash on Hand', available: true },
  { value: 'bank_transfer', label: 'Bank Transfer', available: false },
  { value: 'gcash', label: 'GCash', available: false },
  { value: 'paymaya', label: 'PayMaya', available: false }
] as const

// Breed mapping
const breedsByAnimalType: Record<string, readonly string[]> = {
  'Cattle': ['Angus', 'Holstein', 'Brahman', 'Charolais', 'Simmental', 'Hereford', 'Limousin', 'Wagyu', 'Native/Local Breed', 'Crossbred', 'Other'] as const,
  'Goat': ['Boer', 'Nubian', 'Saanen', 'Alpine', 'LaMancha', 'Toggenburg', 'Nigerian Dwarf', 'Kiko', 'Spanish', 'Native/Local Breed', 'Crossbred', 'Other'] as const,
  'Pig': ['Yorkshire', 'Landrace', 'Duroc', 'Hampshire', 'Berkshire', 'Chester White', 'Poland China', 'Pietrain', 'Large White', 'Native/Local Breed', 'Crossbred', 'Other'] as const,
  'Chicken': ['Rhode Island Red', 'Leghorn', 'Plymouth Rock', 'Brahma', 'Orpington', 'Wyandotte', 'Sussex', 'Marans', 'Australorp', 'Native/Local Breed', 'Broiler', 'Layer', 'Dual Purpose', 'Other'] as const,
  'Duck': ['Pekin', 'Mallard', 'Rouen', 'Khaki Campbell', 'Runner', 'Muscovy', 'Call Duck', 'Cayuga', 'Swedish Blue', 'Native/Local Breed', 'Other'] as const,
  'Carabao': ['Murrah', 'Nili-Ravi', 'Surti', 'Jaffarabadi', 'Native Carabao', 'Crossbred', 'Other'] as const,
  'Sheep': ['Dorper', 'Merino', 'Suffolk', 'Hampshire', 'Romney', 'Border Leicester', 'Corriedale', 'Rambouillet', 'Katahdin', 'Native/Local Breed', 'Crossbred', 'Other'] as const,
  'Horse': ['Arabian', 'Thoroughbred', 'Quarter Horse', 'Paint', 'Appaloosa', 'Mustang', 'Clydesdale', 'Percheron', 'Friesian', 'Native/Local Breed', 'Other'] as const
}

// Watch for modal open to initialize
watch(() => props.isOpen, async (newValue) => {
  if (newValue && props.animal) {
    await initializeForm()
  } else if (!newValue) {
    resetFormCompletely()
  }
})

// Methods
const initializeForm = async (): Promise<void> => {
  if (!props.animal) return
  
  console.log('🔄 Initializing edit form...')
  console.log('📦 Animal delivery options:', props.animal.deliveryOptions)
  
  // Reset first
  resetFormCompletely()
  
  // Load addresses
  await loadUserAddresses()
  
  // Populate with animal data
  Object.assign(editForm, {
    title: props.animal.title,
    description: props.animal.description,
    type: props.animal.type,
    breed: props.animal.breed,
    gender: props.animal.gender,
    age: props.animal.age,
    weight: props.animal.weight,
    weightUnit: props.animal.weightUnit || 'kg',
    quantity: props.animal.quantity,
    status: props.animal.status,
    healthStatus: props.animal.healthStatus ? [...props.animal.healthStatus] : [],
    price: props.animal.price,
    priceUnit: props.animal.priceUnit || 'per head',
    deliveryOptions: [...props.animal.deliveryOptions],
    paymentMethods: props.animal.paymentMethods ? [...props.animal.paymentMethods] : [],
    images: [...props.animal.images],
    location: props.animal.location,
  })
  
  // ✅ Parse delivery options from encoded format
  const deliveryInfo = parseDeliveryOptions(props.animal.deliveryOptions)

  if (deliveryInfo.hasPickup && deliveryInfo.pickup) {
    console.log('📅 Loading pickup schedule:', deliveryInfo.pickup)
    Object.assign(pickupSchedule, {
      availableDays: [...deliveryInfo.pickup.availableDays],
      startTime: deliveryInfo.pickup.startTime,
      endTime: deliveryInfo.pickup.endTime
    })
  } else {
    console.log('⚠️ No pickup schedule found')
  }
  
  if (deliveryInfo.hasDelivery && deliveryInfo.delivery) {
    console.log('🚚 Loading delivery fee:', deliveryInfo.delivery.fee)
    deliveryFee.value = deliveryInfo.delivery.fee
  } else {
    console.log('⚠️ No delivery fee found')
    deliveryFee.value = 0
  }
  
  updateAvailableBreeds()
  originalImages.value = [...props.animal.images]
  newImageFiles.value = []
  selectedImageIndex.value = 0
  
  console.log('✅ Form initialized with parsed delivery options')
  console.log('Current pickup schedule:', pickupSchedule)
  console.log('Current delivery fee:', deliveryFee.value)
}

const togglePickup = (event: Event): void => {
  const target = event.target as HTMLInputElement
  if (target.checked) {
    // Add placeholder pickup option
    if (!editForm.deliveryOptions.some(opt => opt.startsWith('pickup:') || opt === 'pickup')) {
      editForm.deliveryOptions.push('pickup')
    }
  } else {
    // Remove all pickup options
    editForm.deliveryOptions = editForm.deliveryOptions.filter(opt => !opt.startsWith('pickup:') && opt !== 'pickup')
    // Reset pickup schedule
    pickupSchedule.availableDays = []
    pickupSchedule.startTime = ''
    pickupSchedule.endTime = ''
  }
}

const toggleDelivery = (event: Event): void => {
  const target = event.target as HTMLInputElement
  if (target.checked) {
    // Add placeholder delivery option
    if (!editForm.deliveryOptions.some(opt => opt.startsWith('delivery:') || opt === 'delivery')) {
      editForm.deliveryOptions.push('delivery')
    }
  } else {
    // Remove all delivery options
    editForm.deliveryOptions = editForm.deliveryOptions.filter(opt => !opt.startsWith('delivery:') && opt !== 'delivery')
    // Reset delivery fee
    deliveryFee.value = 0
  }
}

const loadUserAddresses = async (): Promise<void> => {
  try {
    loadingAddresses.value = true
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      console.error('No authenticated user')
      return
    }

    console.log('📍 Loading user addresses...')
    const addresses = await ProfileService.getAddresses(user.id)
    userAddresses.value = addresses
    console.log(`✅ Loaded ${addresses.length} addresses`)
  } catch (error) {
    console.error('Error loading addresses:', error)
  } finally {
    loadingAddresses.value = false
  }
}

const formatAddress = (address: Address): string => {
  const parts = [address.province, address.city].filter(Boolean)
  return parts.join(', ')
}

const handleCustomLocation = (): void => {
  if (customLocation.value.trim()) {
    editForm.location = customLocation.value.trim()
  }
}

const updateAvailableBreeds = (): void => {
  if (editForm.type && breedsByAnimalType[editForm.type]) {
    availableBreeds.value = [...breedsByAnimalType[editForm.type]]
  } else {
    availableBreeds.value = []
  }
}

const clearFieldError = (fieldName: string): void => {
  fieldErrors[fieldName] = ''
  if (validationError.value) {
    validationError.value = ''
  }
}

const clearAllFieldErrors = (): void => {
  Object.keys(fieldErrors).forEach(key => {
    fieldErrors[key] = ''
  })
  validationError.value = ''
}

const resetFormCompletely = (): void => {
  console.log('🔄 Resetting form completely')
  
  Object.assign(editForm, getInitialFormState())
  
  // Reset pickup schedule
  Object.assign(pickupSchedule, {
    availableDays: [],
    startTime: '',
    endTime: ''
  })
  
  // Reset delivery fee
  deliveryFee.value = 0
  
  clearAllFieldErrors()
  saveError.value = ''
  newImageFiles.value = []
  originalImages.value = []
  selectedImageIndex.value = 0
  availableBreeds.value = []
  customLocation.value = ''
  
  if (fileInput.value) {
    fileInput.value.value = ''
  }
  
  isSaving.value = false
  uploadingImages.value = false
  
  console.log('✅ Form reset complete')
}

const validateForm = (): { isValid: boolean; firstErrorField: string | null } => {
  clearAllFieldErrors()
  
  const errors: { field: string; message: string; ref: string }[] = []

  if (!editForm.title.trim()) {
    errors.push({ field: 'title', message: 'Title is required', ref: 'titleField' })
  }
  
  if (!editForm.description.trim()) {
    errors.push({ field: 'description', message: 'Description is required', ref: 'descriptionField' })
  }
  
  if (!editForm.type.trim()) {
    errors.push({ field: 'type', message: 'Animal type is required', ref: 'typeField' })
  }
  
  if (!editForm.breed.trim()) {
    errors.push({ field: 'breed', message: 'Breed is required', ref: 'breedField' })
  }
  
  if (!editForm.gender) {
    errors.push({ field: 'gender', message: 'Gender is required', ref: 'genderField' })
  }
  
  if (!editForm.age.trim()) {
    errors.push({ field: 'age', message: 'Age is required', ref: 'ageField' })
  }
  
  if (!editForm.weight || editForm.weight <= 0) {
    errors.push({ field: 'weight', message: 'Valid weight is required', ref: 'weightField' })
  }
  
  if (!editForm.quantity || editForm.quantity < 1) {
    errors.push({ field: 'quantity', message: 'Quantity must be at least 1', ref: 'quantityField' })
  }
  
  if (!editForm.price || editForm.price <= 0) {
    errors.push({ field: 'price', message: 'Valid price is required', ref: 'priceField' })
  }
  
  const hasAnyDeliveryOption = editForm.deliveryOptions.some(opt => 
    opt.startsWith('pickup:') || opt.startsWith('delivery:') || opt === 'pickup' || opt === 'delivery' || opt === 'meetup'
  )
  
  if (!hasAnyDeliveryOption) {
    errors.push({ field: 'deliveryOptions', message: 'Select at least one delivery option', ref: 'deliveryOptionsField' })
  }
  
  // ✅ Validate pickup schedule if pickup is selected
  if (editForm.deliveryOptions.some(opt => opt.startsWith('pickup:') || opt === 'pickup')) {
    if (pickupSchedule.availableDays.length === 0) {
      errors.push({ field: 'deliveryOptions', message: 'Select at least one pickup day', ref: 'deliveryOptionsField' })
    }
    
    if (!pickupSchedule.startTime) {
      errors.push({ field: 'deliveryOptions', message: 'Pickup start time is required', ref: 'deliveryOptionsField' })
    }
    
    if (!pickupSchedule.endTime) {
      errors.push({ field: 'deliveryOptions', message: 'Pickup end time is required', ref: 'deliveryOptionsField' })
    }
    
    if (pickupSchedule.startTime && pickupSchedule.endTime && pickupSchedule.startTime >= pickupSchedule.endTime) {
      errors.push({ field: 'deliveryOptions', message: 'End time must be after start time', ref: 'deliveryOptionsField' })
    }
  }
  
  // ✅ Validate delivery fee if delivery is selected
  if (editForm.deliveryOptions.some(opt => opt.startsWith('delivery:') || opt === 'delivery')) {
    if (deliveryFee.value === null || deliveryFee.value === undefined) {
      errors.push({ field: 'deliveryOptions', message: 'Delivery fee is required', ref: 'deliveryOptionsField' })
    }
    
    if (deliveryFee.value < 0) {
      errors.push({ field: 'deliveryOptions', message: 'Delivery fee cannot be negative', ref: 'deliveryOptionsField' })
    }
  }
  
  if (!editForm.location.trim() || editForm.location === '__custom__') {
    errors.push({ field: 'location', message: 'Location is required', ref: 'locationField' })
  }
  
  if (editForm.images.length === 0) {
    errors.push({ field: 'images', message: 'At least one image is required', ref: 'imagesField' })
  }

  if (errors.length > 0) {
    errors.forEach(error => {
      fieldErrors[error.field] = error.message
    })
    
    validationError.value = `Please fill in all required fields (${errors.length} field${errors.length > 1 ? 's' : ''} missing)`
    
    return { isValid: false, firstErrorField: errors[0].ref }
  }

  return { isValid: true, firstErrorField: null }
}

const scrollToField = (fieldRefName: string): void => {
  const refs: Record<string, any> = {
    titleField: titleField.value,
    descriptionField: descriptionField.value,
    typeField: typeField.value,
    breedField: breedField.value,
    genderField: genderField.value,
    ageField: ageField.value,
    weightField: weightField.value,
    quantityField: quantityField.value,
    priceField: priceField.value,
    deliveryOptionsField: deliveryOptionsField.value,
    locationField: locationField.value,
    imagesField: imagesField.value
  }

  const fieldElement = refs[fieldRefName]
  const container = editFormScrollContainer.value

  if (fieldElement && container) {
    const fieldRect = fieldElement.getBoundingClientRect()
    const containerRect = container.getBoundingClientRect()
    const scrollTop = container.scrollTop + (fieldRect.top - containerRect.top) - 100

    container.scrollTo({
      top: scrollTop,
      behavior: 'smooth'
    })

    setTimeout(() => {
      const inputElement = fieldElement.querySelector('input, select, textarea')
      if (inputElement) {
        inputElement.focus()
      }
    }, 500)
  }
}

const nextImage = (): void => {
  selectedImageIndex.value = selectedImageIndex.value < editForm.images.length - 1
    ? selectedImageIndex.value + 1
    : 0
}

const previousImage = (): void => {
  selectedImageIndex.value = selectedImageIndex.value > 0
    ? selectedImageIndex.value - 1
    : editForm.images.length - 1
}

const removeImage = (index: number): void => {
  editForm.images.splice(index, 1)
  
  if (index >= originalImages.value.length) {
    const newFileIndex = index - originalImages.value.length
    if (newFileIndex >= 0 && newFileIndex < newImageFiles.value.length) {
      newImageFiles.value.splice(newFileIndex, 1)
    }
  }
  
  if (selectedImageIndex.value >= editForm.images.length) {
    selectedImageIndex.value = Math.max(0, editForm.images.length - 1)
  }
  
  if (editForm.images.length > 0) {
    clearFieldError('images')
  }
}

const handleImageUpload = (event: Event): void => {
  const target = event.target as HTMLInputElement
  const files = target.files
  if (!files) return

  Array.from(files).forEach(file => {
    if (editForm.images.length >= 5) {
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

    newImageFiles.value.push(file)

    const reader = new FileReader()
    reader.onload = (e) => {
      if (e.target?.result) {
        editForm.images.push(e.target.result as string)
        clearFieldError('images')
      }
    }
    reader.readAsDataURL(file)
  })

  target.value = ''
}

const handleClose = (): void => {
  if (!isSaving.value) {
    emit('close')
  }
}

const handleSave = async (): Promise<void> => {
  if (!props.animal) return

  const validation = validateForm()
  if (!validation.isValid && validation.firstErrorField) {
    scrollToField(validation.firstErrorField)
    return
  }

  saveError.value = ''
  isSaving.value = true

  try {
    console.log('💾 Updating listing...')

    if (newImageFiles.value.length > 0) {
      uploadingImages.value = true
      
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        throw new Error('User not authenticated')
      }

      console.log('📤 Uploading new images to storage...')
      const uploadResult = await LivestockService.uploadImages(newImageFiles.value, user.id)
      
      if (!uploadResult.success || !uploadResult.urls) {
        throw new Error(uploadResult.error || 'Failed to upload images')
      }

      const oldImageCount = originalImages.value.length
      editForm.images = [
        ...editForm.images.slice(0, oldImageCount),
        ...uploadResult.urls
      ]
      
      uploadingImages.value = false
      console.log('✅ New images uploaded successfully')
    }

    // ✅ Build delivery options array with encoded data
    const deliveryOptions: string[] = []
    
    if (editForm.deliveryOptions.some(opt => opt.startsWith('pickup:') || opt === 'pickup')) {
      const pickupData = `pickup:${pickupSchedule.availableDays.join('|')}:${pickupSchedule.startTime}:${pickupSchedule.endTime}`
      deliveryOptions.push(pickupData)
      console.log('📅 Encoding pickup schedule:', pickupData)
    }
    
    if (editForm.deliveryOptions.some(opt => opt.startsWith('delivery:') || opt === 'delivery')) {
      const deliveryData = `delivery:${deliveryFee.value}`
      deliveryOptions.push(deliveryData)
      console.log('🚚 Encoding delivery fee:', deliveryData)
    }
    
    if (editForm.deliveryOptions.includes('meetup')) {
      deliveryOptions.push('meetup')
    }

    // Create update payload with encoded delivery options
    const updatePayload: any = {
      ...editForm,
      deliveryOptions  // Use encoded array
    }

    console.log('📦 Update payload:', updatePayload)

    const result = await LivestockService.updateListing(
      props.animal.uuid,
      updatePayload,
      originalImages.value
    )

    if (result.success) {
      console.log('✅ Listing updated successfully:', result.data)
      emit('updated')
      emit('close')
    } else {
      console.error('❌ Failed to update listing:', result.error)
      saveError.value = result.error || 'Failed to update listing. Please try again.'
      
      if (newImageFiles.value.length > 0 && editForm.images.length > originalImages.value.length) {
        const newlyUploadedUrls = editForm.images.slice(originalImages.value.length)
        console.log('🧹 Cleaning up newly uploaded images due to update failure...')
        await LivestockService.deleteImages(newlyUploadedUrls)
      }
    }
  } catch (error: any) {
    console.error('❌ Error updating listing:', error)
    saveError.value = error.message || 'An unexpected error occurred. Please try again.'
    
    if (newImageFiles.value.length > 0 && editForm.images.length > originalImages.value.length) {
      const newlyUploadedUrls = editForm.images.slice(originalImages.value.length)
      console.log('🧹 Cleaning up newly uploaded images due to error...')
      await LivestockService.deleteImages(newlyUploadedUrls)
    }
  } finally {
    isSaving.value = false
    uploadingImages.value = false
  }
}
</script>

<style scoped>
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
  20%, 40%, 60%, 80% { transform: translateX(5px); }
}

.animate-shake {
  animation: shake 0.5s ease-in-out;
}
</style>