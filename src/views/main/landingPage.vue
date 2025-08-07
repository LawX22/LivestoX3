<template>
  <div class="min-h-screen flex flex-col bg-white">
    <!-- Sticky Navbar -->
    <div class="sticky top-0 z-50 shadow bg-white">
      <NavBar />
    </div>

    <!-- Section 1: Search / Login / Signup -->
    <section class="bg-green-100 py-16 px-6 text-center">
      <h1 class="text-3xl font-bold text-green-800 mb-4">Find the Right Livestock for You</h1>
      <p class="text-gray-700 mb-6">Search for animals or create an account to get started.</p>

      <div class="flex flex-col sm:flex-row justify-center items-center gap-4 max-w-xl mx-auto">
        <input
          type="text"
          placeholder="Search livestock (e.g., bull, cow)"
          class="w-full sm:w-2/3 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <button class="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition">
          Search
        </button>
      </div>

      <div class="mt-6 flex justify-center gap-4">
        <button class="border border-green-600 text-green-600 px-5 py-2 rounded hover:bg-green-50 transition">
          Sign In
        </button>
        <button class="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700 transition">
          Fuck up
        </button>
      </div>
    </section>

    <!-- Section 2: Best Selling Animals -->
    <section class="py-16 px-6 bg-white">
      <h2 class="text-2xl font-bold text-center text-green-800 mb-10">Best Selling Livestock</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        <div
          v-for="item in bestSellers"
          :key="item.id"
          class="border rounded shadow-sm p-4 hover:shadow-md transition"
        >
          <img :src="item.image" alt="animal" class="w-full h-40 object-cover rounded mb-4" />
          <h3 class="text-lg font-semibold text-gray-800">{{ item.name }}</h3>
          <p class="text-gray-600 text-sm mb-2">{{ item.description }}</p>
          <p class="text-green-600 font-semibold">₱{{ item.price }}</p>
        </div>
      </div>
    </section>

    <!-- Section 3: Forum Preview -->
    <section class="py-16 px-6 bg-gray-100">
      <h2 class="text-2xl font-bold text-center text-green-800 mb-10">Community Forum</h2>
      <div class="max-w-4xl mx-auto space-y-6">
        <div
          v-for="post in forumPosts"
          :key="post.id"
          class="bg-white p-4 rounded shadow hover:shadow-md transition"
        >
          <h3 class="text-lg font-semibold text-gray-800">{{ post.title }}</h3>
          <p class="text-gray-600 text-sm">{{ post.snippet }}</p>
          <p class="text-xs text-gray-400 mt-1">Posted by {{ post.author }}</p>
        </div>
      </div>
      <div class="text-center mt-8">
        <router-link
          to="/forum"
          class="inline-block bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
        >
          Visit Forum
        </router-link>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-gray-200 text-gray-700 text-center py-4">
      © 2025 LivestoX. All rights reserved.
    </footer>
  </div>
</template>

<script setup lang="ts">
import NavBar from '../../components/NavBar.vue';

const bestSellers = [
  {
    id: 1,
    name: 'Bull (Local Breed)',
    description: 'Strong and healthy, suitable for farm work or breeding.',
    price: 28000,
    image: '/src/assets/Bull.jpg',
  },
  {
    id: 2,
    name: 'Cow (Dairy Type)',
    description: 'High milk production, ideal for small to mid-scale farms.',
    price: 25000,
    image: '/src/assets/cow.jpg',
  },
  {
    id: 3,
    name: 'Boer Goat',
    description: 'Great for meat production and easy to maintain.',
    price: 4500,
    image: 'https://via.placeholder.com/400x200?text=Goat',
  },
];

const forumPosts = [
  {
    id: 1,
    title: 'Best practices in feeding bulls?',
    snippet: 'Any affordable feeding tips that boost growth?',
    author: 'FarmerNico',
  },
  {
    id: 2,
    title: 'Cow not producing enough milk',
    snippet: 'Looking for supplements that help dairy cows...',
    author: 'DairyMama',
  },
  {
    id: 3,
    title: 'How to sell livestock online?',
    snippet: 'What platforms do you use for selling animals?',
    author: 'TechAgriPH',
  },
];
</script>
