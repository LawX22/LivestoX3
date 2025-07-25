<!-- NavBar.vue -->
<template>
  <nav
    class="w-full flex items-center justify-between px-6 py-3 bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
    <!-- Left: Logo and Brand Name -->
    <div class="flex items-center gap-2">
      <img src="/src/assets/vue.svg" alt="Logo" class="w-8 h-8" />
      <span class="text-lg font-semibold text-green-600">LivestoX</span>
    </div>

    <!-- Center: Navigation Links -->
    <ul class="hidden md:flex gap-6 text-sm font-medium items-center">
      <!-- Show Home and About Us only for guests -->
      <template v-if="!user">
        <li>
          <router-link to="/" class="hover:text-green-500 transition flex items-center gap-1"
            active-class="text-green-600">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Home
          </router-link>
        </li>
        <li>
          <router-link to="/aboutUs" class="hover:text-green-500 transition flex items-center gap-1"
            active-class="text-green-600">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            About Us
          </router-link>
        </li>
      </template>

      <!-- Common links for all users -->
      <li>
        <router-link to="/market" class="hover:text-green-500 transition flex items-center gap-1"
          active-class="text-green-600">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          Market
        </router-link>
      </li>
      <li>
        <router-link to="/forum" class="hover:text-green-500 transition flex items-center gap-1"
          active-class="text-green-600">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          Forum
        </router-link>
      </li>

      <!-- Additional links for logged-in users -->
      <template v-if="user">
        <li>
          <router-link to="/transactions" class="hover:text-green-500 transition flex items-center gap-1"
            active-class="text-green-600">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Transactions
          </router-link>
        </li>
        <li>
          <router-link to="/dashboard" class="hover:text-green-500 transition flex items-center gap-1"
            active-class="text-green-600">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
            Dashboard
          </router-link>
        </li>
      </template>
    </ul>

    <!-- Right: Auth or User Info -->
    <div class="flex items-center gap-4 relative" ref="dropdownRef">
      <!-- Notification and Message Icons (only shown when logged in) -->
      <template v-if="user">
        <!-- Notification Dropdown -->
        <div class="relative" ref="notificationRef">
          <button @click="toggleNotificationDropdown"
            class="relative p-2 rounded-full hover:bg-gray-100 transition group">
            <div class="w-5 h-5 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500 group-hover:text-gray-700"
                fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span v-if="unreadNotifications > 0"
                class="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
            </div>
          </button>

          <!-- Notification Dropdown Content -->
          <div v-show="showNotificationDropdown"
            class="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-lg border border-gray-200 z-50 divide-y divide-gray-100">
            <div class="px-4 py-3 border-b border-gray-200">
              <h3 class="text-sm font-medium text-gray-900">Notifications</h3>
            </div>

            <div class="py-1">
              <!-- Notification Item 1 -->
              <a href="#" class="flex px-4 py-3 text-sm hover:bg-gray-50 transition"
                @click.prevent="markAsRead('notification', 1)">
                <div class="flex-shrink-0">
                  <div class="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-600" fill="none"
                      viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <div class="ml-3">
                  <p class="text-sm font-medium text-gray-900">
                    Order #1234 has been confirmed
                  </p>
                  <p class="text-xs text-gray-500 mt-1">
                    Your recent order has been confirmed by the seller.
                  </p>
                  <p class="text-xs text-gray-400 mt-1">2 hours ago</p>
                </div>
              </a>

              <!-- Notification Item 2 -->
              <a href="#" class="flex px-4 py-3 text-sm hover:bg-gray-50 transition"
                @click.prevent="markAsRead('notification', 2)">
                <div class="flex-shrink-0">
                  <div class="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-600" fill="none"
                      viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <div class="ml-3">
                  <p class="text-sm font-medium text-gray-900">
                    Reminder: Payment due
                  </p>
                  <p class="text-xs text-gray-500 mt-1">
                    Your payment for order #1234 is due tomorrow.
                  </p>
                  <p class="text-xs text-gray-400 mt-1">1 day ago</p>
                </div>
              </a>
            </div>

            <div class="py-1">
              <router-link to="/notifications"
                class="block px-4 py-2 text-sm text-center text-green-600 hover:bg-gray-50 transition"
                @click="closeNotificationDropdown">
                See all notifications
              </router-link>
            </div>
          </div>
        </div>

        <!-- Messages Dropdown -->
        <div class="relative" ref="messageRef">
          <button @click="toggleMessageDropdown" class="relative p-2 rounded-full hover:bg-gray-100 transition group">
            <div class="w-5 h-5 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500 group-hover:text-gray-700"
                fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <span v-if="unreadMessages > 0"
                class="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
            </div>
          </button>

          <!-- Messages Dropdown Content - Fixed spacing -->
          <div v-show="showMessageDropdown"
            class="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-lg border border-gray-200 z-50 divide-y divide-gray-100">
            <div class="px-4 py-3 border-b border-gray-200">
              <h3 class="text-sm font-medium text-gray-900">Messages</h3>
            </div>

            <div class="py-1">
              <!-- Message Item 1 - Fixed spacing -->
              <a href="#" class="flex px-4 py-3 text-sm hover:bg-gray-50 transition"
                @click.prevent="markAsRead('message', 1)">
                <div class="flex-shrink-0 mr-3">
                  <div class="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                    <span class="text-sm font-medium text-gray-600">JD</span>
                  </div>
                </div>
                <div class="min-w-0 flex-1">
                  <div class="flex justify-between items-start">
                    <p class="text-sm font-medium text-gray-900 truncate">John Doe</p>
                    <span class="text-xs text-gray-400 whitespace-nowrap ml-2">30 min ago</span>
                  </div>
                  <p class="text-xs text-gray-500 mt-1 truncate">
                    Hi there! I'm interested in your livestock. Can we discuss the price?
                  </p>
                </div>
              </a>

              <!-- Message Item 2 - Fixed spacing -->
              <a href="#" class="flex px-4 py-3 text-sm hover:bg-gray-50 transition"
                @click.prevent="markAsRead('message', 2)">
                <div class="flex-shrink-0 mr-3">
                  <div class="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                    <span class="text-sm font-medium text-gray-600">AS</span>
                  </div>
                </div>
                <div class="min-w-0 flex-1">
                  <div class="flex justify-between items-start">
                    <p class="text-sm font-medium text-gray-900 truncate">Agri Suppliers</p>
                    <span class="text-xs text-gray-400 whitespace-nowrap ml-2">2 hours ago</span>
                  </div>
                  <p class="text-xs text-gray-500 mt-1 truncate">
                    Your order #1234 has been shipped. Tracking number: XYZ123
                  </p>
                </div>
              </a>
            </div>

            <div class="py-1">
              <router-link to="/messages"
                class="block px-4 py-2 text-sm text-center text-green-600 hover:bg-gray-50 transition"
                @click="closeMessageDropdown">
                See all messages
              </router-link>
            </div>
          </div>
        </div>
      </template>

      <!-- Logged in -->
      <template v-if="user">
        <div>
          <div class="flex items-center cursor-pointer gap-3 hover:bg-gray-50 px-3 py-1 rounded-lg transition"
            @click="toggleDropdown">
            <!-- Profile Image with ring and gray background -->
            <div class="relative">
              <div class="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center ring-2 ring-gray-300">
                <span class="text-sm font-medium text-gray-600">
                  {{ getInitials(user.firstName, user.lastName) }}
                </span>
              </div>
            </div>

            <!-- User Info (hidden on mobile) -->
            <div class="hidden md:block">
              <p class="text-sm font-medium text-gray-800">
                {{ user.firstName }} {{ user.lastName }}
              </p>
              <p class="text-xs text-gray-500 capitalize">
                {{ user.role.toLowerCase() }}
              </p>
            </div>

            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 20 20"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>

          <!-- Dropdown -->
          <div v-show="showDropdown"
            class="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-50 divide-y divide-gray-100">
            <div class="py-1">
              <!-- Combined Profile Link with User Info -->
              <router-link to="/userProfile" class="flex items-start px-4 py-3 text-sm hover:bg-gray-50 transition"
                @click="closeDropdown">
                <div class="mr-3">
                  <div class="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center ring-2 ring-gray-300">
                    <span class="text-sm font-medium text-gray-600">
                      {{ getInitials(user.firstName, user.lastName) }}
                    </span>
                  </div>
                </div>
                <div>
                  <p class="font-medium text-gray-900">
                    {{ user.firstName }} {{ user.lastName }}
                  </p>
                  <p class="text-xs text-gray-500 truncate">{{ user.email }}</p>
                  <p class="text-xs mt-1 text-green-600 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    View Profile
                  </p>
                </div>
              </router-link>

              <router-link to="/dashboard"
                class="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition"
                @click="closeDropdown">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2 text-gray-500" fill="none"
                  viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
                Dashboard
              </router-link>

              <!-- Show Transactions only for farmers -->
              <router-link v-if="user.role === 'FARMER'" to="/transactions"
                class="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition"
                @click="closeDropdown">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2 text-gray-500" fill="none"
                  viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Transactions
              </router-link>
            </div>

            <div class="py-1">
              <button @click="logout"
                class="flex items-center w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition text-left">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2 text-gray-500" fill="none"
                  viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Sign out
              </button>
            </div>
          </div>
        </div>
      </template>

      <!-- Not logged in -->
      <template v-else>
        <router-link to="/signIn"
          class="border border-green-500 px-4 py-1.5 rounded-md text-sm hover:bg-green-50 hover:text-green-600 transition flex items-center gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
          </svg>
          Sign In
        </router-link>
        <router-link to="/signup"
          class="bg-green-600 text-white px-4 py-1.5 rounded-md text-sm hover:bg-green-700 transition flex items-center gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 12a9 9 0 1118 0 9 9 0 01-18 0z" />
          </svg>
          Sign Up
        </router-link>
      </template>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const user = ref<{
  firstName: string;
  lastName: string;
  email: string;
  role: string;
} | null>(null);

const showDropdown = ref(false);
const showNotificationDropdown = ref(false);
const showMessageDropdown = ref(false);
const dropdownRef = ref<HTMLElement | null>(null);
const notificationRef = ref<HTMLElement | null>(null);
const messageRef = ref<HTMLElement | null>(null);
const unreadNotifications = ref(3); // Example count
const unreadMessages = ref(1); // Example count

onMounted(() => {
  // Check if user is logged in
  const savedUser = localStorage.getItem("user");
  if (savedUser) {
    const parsedUser = JSON.parse(savedUser);
    user.value = {
      firstName: parsedUser.firstName || "User",
      lastName: parsedUser.lastName || "Name",
      email: parsedUser.email || "",
      role: parsedUser.role || "User",
    };
  }

  document.addEventListener("click", handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});

function toggleDropdown() {
  showDropdown.value = !showDropdown.value;
  // Close other dropdowns when opening this one
  if (showDropdown.value) {
    showNotificationDropdown.value = false;
    showMessageDropdown.value = false;
  }
}

function toggleNotificationDropdown() {
  showNotificationDropdown.value = !showNotificationDropdown.value;
  // Close other dropdowns when opening this one
  if (showNotificationDropdown.value) {
    showDropdown.value = false;
    showMessageDropdown.value = false;
  }
}

function toggleMessageDropdown() {
  showMessageDropdown.value = !showMessageDropdown.value;
  // Close other dropdowns when opening this one
  if (showMessageDropdown.value) {
    showDropdown.value = false;
    showNotificationDropdown.value = false;
  }
}

function closeDropdown() {
  showDropdown.value = false;
}

function closeNotificationDropdown() {
  showNotificationDropdown.value = false;
}

function closeMessageDropdown() {
  showMessageDropdown.value = false;
}

function handleClickOutside(event: MouseEvent) {
  const target = event.target as Node;

  // Close dropdown if clicked outside
  if (dropdownRef.value && !dropdownRef.value.contains(target)) {
    showDropdown.value = false;
  }

  // Close notification dropdown if clicked outside
  if (notificationRef.value && !notificationRef.value.contains(target)) {
    showNotificationDropdown.value = false;
  }

  // Close message dropdown if clicked outside
  if (messageRef.value && !messageRef.value.contains(target)) {
    showMessageDropdown.value = false;
  }
}

function markAsRead(type: "notification" | "message", id: number) {
  if (type === "notification") {
    // In a real app, you would mark the notification as read via API
    console.log(`Marking notification ${id} as read`);
    unreadNotifications.value = Math.max(0, unreadNotifications.value - 1);
    closeNotificationDropdown();
  } else {
    // In a real app, you would mark the message as read via API
    console.log(`Marking message ${id} as read`);
    unreadMessages.value = Math.max(0, unreadMessages.value - 1);
    closeMessageDropdown();
  }
}

function logout() {
  localStorage.removeItem("user");
  user.value = null;
  showDropdown.value = false;
  router.push("/");
}

function getInitials(firstName: string, lastName: string) {
  return `${firstName?.charAt(0) || ""}${lastName?.charAt(0) || ""}`.toUpperCase();
}
</script> 