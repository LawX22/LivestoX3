<template>
  <div 
    v-if="isOpen"
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    @click.self="closeModal"
  >
    <div class="bg-white rounded-lg shadow-xl w-full max-w-3xl overflow-hidden max-h-[90vh] flex flex-col">
      <div class="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
        <h2 class="text-xl font-bold text-green-800">{{ isEditMode ? 'Edit Listing' : 'Add New Listing' }}</h2>
        <button 
          @click="closeModal"
          class="text-gray-400 hover:text-gray-500 focus:outline-none"
        >
          <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div class="overflow-y-auto flex-1 p-6">
        <form @submit.prevent="handleSubmit">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Left Column -->
            <div class="space-y-4">
              <!-- Animal Type -->
              <div>
                <label for="type" class="block text-sm font-medium text-gray-700 mb-1">Animal Type *</label>
                <select
                  id="type"
                  v-model="formData.type"
                  required
                  class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md border"
                >
                  <option value="">Select type</option>
                  <option value="Cattle">Cattle</option>
                  <option value="Pig">Pig</option>
                  <option value="Goat">Goat</option>
                  <option value="Sheep">Sheep</option>
                  <option value="Chicken">Chicken</option>
                  <option value="Duck">Duck</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <!-- Breed -->
              <div>
                <label for="breed" class="block text-sm font-medium text-gray-700 mb-1">Breed *</label>
                <input
                  type="text"
                  id="breed"
                  v-model="formData.breed"
                  required
                  class="mt-1 focus:ring-green-500 focus:border-green-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md border p-2"
                />
              </div>

              <!-- Weight -->
              <div>
                <label for="weight" class="block text-sm font-medium text-gray-700 mb-1">Weight (kg) *</label>
                <input
                  type="number"
                  id="weight"
                  v-model="formData.weight"
                  required
                  min="0"
                  step="0.1"
                  class="mt-1 focus:ring-green-500 focus:border-green-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md border p-2"
                />
              </div>

              <!-- Quantity -->
              <div>
                <label for="quantity" class="block text-sm font-medium text-gray-700 mb-1">Quantity *</label>
                <input
                  type="number"
                  id="quantity"
                  v-model="formData.quantity"
                  required
                  min="1"
                  class="mt-1 focus:ring-green-500 focus:border-green-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md border p-2"
                />
              </div>
            </div>

            <!-- Right Column -->
            <div class="space-y-4">
              <!-- Age -->
              <div>
                <label for="age" class="block text-sm font-medium text-gray-700 mb-1">Age</label>
                <input
                  type="text"
                  id="age"
                  v-model="formData.age"
                  placeholder="e.g. 12 months"
                  class="mt-1 focus:ring-green-500 focus:border-green-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md border p-2"
                />
              </div>

              <!-- Price -->
              <div>
                <label for="price" class="block text-sm font-medium text-gray-700 mb-1">Price (₱)</label>
                <input
                  type="number"
                  id="price"
                  v-model="formData.price"
                  min="0"
                  class="mt-1 focus:ring-green-500 focus:border-green-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md border p-2"
                />
              </div>

              <!-- Status -->
              <div>
                <label for="status" class="block text-sm font-medium text-gray-700 mb-1">Status *</label>
                <select
                  id="status"
                  v-model="formData.status"
                  required
                  class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md border"
                >
                  <option value="Available">Available</option>
                  <option value="Reserved">Reserved</option>
                  <option value="Sold">Sold</option>
                </select>
              </div>

              <!-- Delivery Options -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Delivery Options *</label>
                <div class="mt-1 space-x-4">
                  <label class="inline-flex items-center">
                    <input
                      type="checkbox"
                      v-model="formData.deliveryOptions"
                      value="pickup"
                      class="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                    />
                    <span class="ml-2 text-sm text-gray-700">Pick Up</span>
                  </label>
                  <label class="inline-flex items-center">
                    <input
                      type="checkbox"
                      v-model="formData.deliveryOptions"
                      value="delivery"
                      class="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                    />
                    <span class="ml-2 text-sm text-gray-700">Delivery</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <!-- Images Upload -->
          <div class="mt-6">
            <label class="block text-sm font-medium text-gray-700 mb-1">Images *</label>
            <div class="mt-1 flex items-center gap-4">
              <div 
                v-for="(image, index) in formData.images" 
                :key="index"
                class="relative"
              >
                <img :src="image" class="h-24 w-24 object-cover rounded-md border border-gray-200">
                <button
                  type="button"
                  @click="removeImage(index)"
                  class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                >
                  <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <label 
                v-if="formData.images.length < 5"
                class="flex flex-col items-center justify-center h-24 w-24 rounded-md border-2 border-dashed border-gray-300 cursor-pointer hover:border-green-500 hover:bg-gray-50"
              >
                <input 
                  type="file" 
                  @change="handleImageUpload" 
                  accept="image/*" 
                  class="hidden"
                  multiple
                >
                <svg class="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <span class="text-xs text-gray-500 mt-1">Add Image</span>
              </label>
            </div>
            <p class="mt-1 text-xs text-gray-500">Upload up to 5 images (first image will be used as thumbnail)</p>
          </div>

          <!-- Description -->
          <div class="mt-6">
            <label for="description" class="block text-sm font-medium text-gray-700 mb-1">Description *</label>
            <textarea
              id="description"
              v-model="formData.description"
              rows="3"
              required
              class="mt-1 focus:ring-green-500 focus:border-green-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md border p-2"
              placeholder="Provide details about the animal (health, diet, special characteristics, etc.)"
            ></textarea>
          </div>

          <div class="mt-8 pt-5 border-t border-gray-200 flex justify-end">
            <button
              type="button"
              @click="closeModal"
              class="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              {{ isEditMode ? 'Update Listing' : 'Create Listing' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

interface AnimalFormData {
  id?: number;
  type: string;
  breed: string;
  weight: number | string;
  quantity: number | string;
  age: string;
  status: string;
  price: number | string;
  deliveryOptions: string[];
  images: string[];
  description: string;
}

const props = defineProps<{
  isOpen: boolean;
  isEditMode?: boolean;
  currentAnimal: AnimalFormData | null;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'submit', data: AnimalFormData & { datePosted: string }): void;
}>();

const formData = ref<AnimalFormData>({
  type: '',
  breed: '',
  weight: '',
  quantity: '',
  age: '',
  status: 'Available',
  price: '',
  deliveryOptions: ['pickup'],
  images: [],
  description: ''
});

const resetForm = () => {
  formData.value = {
    type: '',
    breed: '',
    weight: '',
    quantity: '',
    age: '',
    status: 'Available',
    price: '',
    deliveryOptions: ['pickup'],
    images: [],
    description: ''
  };
}

watch(
  () => props.isOpen,
  (newVal) => {
    if (newVal && props.currentAnimal) {
      formData.value = {
        ...props.currentAnimal,
        weight: props.currentAnimal.weight.toString(),
        quantity: props.currentAnimal.quantity.toString(),
        price: props.currentAnimal.price.toString()
      };
    } else if (newVal) {
      resetForm();
    }
  }
);

const closeModal = () => {
  emit('close');
}

const handleSubmit = () => {
  const submittedData = {
    ...formData.value,
    weight: Number(formData.value.weight),
    quantity: Number(formData.value.quantity),
    price: Number(formData.value.price),
    datePosted: new Date().toISOString()
  };

  emit('submit', submittedData);
  closeModal();
}

const handleImageUpload = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files.length) {
    const files = Array.from(input.files);
    const remainingSlots = 5 - formData.value.images.length;

    files.slice(0, remainingSlots).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          formData.value.images.push(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    });
  }
}

const removeImage = (index: number) => {
  formData.value.images.splice(index, 1);
}
</script>