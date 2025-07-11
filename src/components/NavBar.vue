<template>
  <nav
    class="w-full flex items-center justify-between px-6 py-4 bg-white border-b border-green-300 text-gray-800 sticky top-0 z-50"
  >
    <!-- Left: Logo and Brand Name -->
    <div class="flex items-center gap-2">
      <img src="/src/assets/vue.svg" alt="Logo" class="w-8 h-8" />
      <span class="text-lg font-semibold text-green-600">LivestoX</span>
    </div>

    <!-- Center: Navigation Links -->
    <ul class="hidden md:flex gap-6 text-sm font-medium items-center">
      <li>
        <router-link to="/" class="hover:text-green-500 transition">Home</router-link>
      </li>
      <li v-if="user">
        <router-link to="/dashboard" class="hover:text-green-500 transition">Dashboard</router-link>
      </li>
      <li>
        <router-link to="/market" class="hover:text-green-500 transition">Market</router-link>
      </li>
      <li>
        <router-link to="/forum" class="hover:text-green-500 transition">Forum</router-link>
      </li>
      <li>
        <router-link to="/aboutUs" class="hover:text-green-500 transition">About Us</router-link>
      </li>
    </ul>

    <!-- Right: Auth or User Info -->
    <div class="flex items-center gap-4 relative" ref="dropdownRef">
      <!-- Logged in -->
      <template v-if="user">
        <div>
          <div
            class="flex items-center cursor-pointer gap-2 hover:bg-green-50 px-3 py-1 rounded transition"
            @click="toggleDropdown"
          >
            <div class="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center">
              {{ getInitials(user.email) }}
            </div>
            <span class="text-sm font-medium text-gray-800">{{ user.email }}</span>
            <i class="pi pi-chevron-down text-sm text-gray-500"></i>
          </div>

          <!-- Dropdown -->
          <div
            v-show="showDropdown"
            class="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg z-50 transition-opacity duration-150"
          >
            <router-link
              to="/userProfile"
              class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              @click="closeDropdown"
            >
              Profile
            </router-link>
            <router-link
              to="/dashboard"
              class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              @click="closeDropdown"
            >
              Dashboard
            </router-link>
            <button
              @click="logout"
              class="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-100"
            >
              Logout
            </button>
          </div>
        </div>
      </template>

      <!-- Not logged in -->
      <template v-else>
        <router-link
          to="/signIn"
          class="border border-green-400 px-4 py-1 rounded hover:bg-green-50 hover:text-green-600 transition"
        >
          Sign In
        </router-link>
        <router-link
          to="/signup"
          class="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600 transition"
        >
          Sign Up
        </router-link>
      </template>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const user = ref<{ email: string; role: string } | null>(null);
const showDropdown = ref(false);
const dropdownRef = ref<HTMLElement | null>(null);

onMounted(() => {
  const savedUser = localStorage.getItem('user');
  if (savedUser) {
    user.value = JSON.parse(savedUser);
  }

  document.addEventListener('click', handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
});

function toggleDropdown() {
  showDropdown.value = !showDropdown.value;
}

function closeDropdown() {
  showDropdown.value = false;
}

function handleClickOutside(event: MouseEvent) {
  const target = event.target as Node;
  if (dropdownRef.value && !dropdownRef.value.contains(target)) {
    showDropdown.value = false;
  }
}

function logout() {
  localStorage.removeItem('user');
  user.value = null;
  showDropdown.value = false;
  router.push('/'); 
}

function getInitials(email: string) {
  return email ? email.charAt(0).toUpperCase() : '?';
}
</script>
