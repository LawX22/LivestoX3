<!-- adminDashboard.vue -->
<template>
  <div class="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
    <!-- Sidebar Component -->
    <AdminSidebar />

    <!-- Main Content -->
    <main class="flex-1 p-8 overflow-auto">
      <!-- Header Section -->
      <div class="flex items-center justify-between mb-8">
        <div>
          <h1 class="text-3xl font-bold text-gray-800">Dashboard Overview</h1>
          <p class="text-gray-500 mt-1">Welcome back, Administrator</p>
        </div>
        <div class="flex items-center space-x-4">
          <div class="relative">
            <button
              class="p-2 rounded-full bg-white shadow hover:bg-gray-50 transition-all duration-200"
            >
              <svg
                class="w-5 h-5 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
            </button>
            <span class="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
          </div>
          <div class="flex items-center space-x-2">
            <div
              class="w-9 h-9 rounded-full bg-gradient-to-br from-emerald-400 to-green-500 flex items-center justify-center text-white font-semibold"
            >
              {{ userInitials }}
            </div>
            <span class="font-medium text-gray-700 hidden md:inline">Admin</span>
          </div>
        </div>
      </div>

      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <router-link
          to="/userManagement"
          class="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 hover:border-emerald-100 group relative overflow-hidden"
        >
          <div
            class="absolute inset-0 bg-gradient-to-r from-emerald-50/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          ></div>
          <div class="relative z-10 flex items-start justify-between">
            <div>
              <p class="text-sm font-medium text-gray-500">Total Users</p>
              <h3 class="text-2xl font-bold mt-1 text-gray-800">
                {{ formatNumber(stats.totalUsers) }}
              </h3>
              <div class="flex items-center mt-2">
                <span
                  :class="[
                    'text-xs font-medium px-1.5 py-0.5 rounded',
                    stats.userChange >= 0
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800',
                  ]"
                >
                  {{ stats.userChange >= 0 ? '+' : '' }}{{ stats.userChange }}%
                </span>
                <span class="text-xs text-gray-500 ml-2">vs last month</span>
              </div>
            </div>
            <div class="p-2 bg-emerald-100 rounded-lg text-emerald-600">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            </div>
          </div>
        </router-link>

        <router-link
          to="/upgradeRequests"
          class="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 hover:border-blue-100 group relative overflow-hidden"
        >
          <div
            class="absolute inset-0 bg-gradient-to-r from-blue-50/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          ></div>
          <div class="relative z-10 flex items-start justify-between">
            <div>
              <p class="text-sm font-medium text-gray-500">Upgrade Requests</p>
              <h3 class="text-2xl font-bold mt-1 text-gray-800">
                {{ formatNumber(stats.requests) }}
              </h3>
              <div class="flex items-center mt-2">
                <span
                  :class="[
                    'text-xs font-medium px-1.5 py-0.5 rounded',
                    stats.requestChange >= 0
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800',
                  ]"
                >
                  {{ stats.requestChange >= 0 ? '+' : '' }}{{ stats.requestChange }}%
                </span>
                <span class="text-xs text-gray-500 ml-2">vs last month</span>
              </div>
            </div>
            <div class="p-2 bg-blue-100 rounded-lg text-blue-600">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
          </div>
          <div v-if="stats.requests > 0" class="absolute top-4 right-4">
            <span
              class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 border border-red-200"
            >
              {{ stats.requests }} pending
            </span>
          </div>
        </router-link>

        <router-link
          to="/admin/livestock"
          class="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 hover:border-amber-100 group relative overflow-hidden"
        >
          <div
            class="absolute inset-0 bg-gradient-to-r from-amber-50/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          ></div>
          <div class="relative z-10 flex items-start justify-between">
            <div>
              <p class="text-sm font-medium text-gray-500">Livestock Listings</p>
              <h3 class="text-2xl font-bold mt-1 text-gray-800">
                {{ formatNumber(stats.livestock) }}
              </h3>
              <div class="flex items-center mt-2">
                <span
                  :class="[
                    'text-xs font-medium px-1.5 py-0.5 rounded',
                    stats.livestockChange >= 0
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800',
                  ]"
                >
                  {{ stats.livestockChange >= 0 ? '+' : '' }}{{ stats.livestockChange }}%
                </span>
                <span class="text-xs text-gray-500 ml-2">vs last month</span>
              </div>
            </div>
            <div class="p-2 bg-amber-100 rounded-lg text-amber-600">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </div>
          </div>
        </router-link>

        <router-link
          to="/admin/reports"
          class="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 hover:border-purple-100 group relative overflow-hidden"
        >
          <div
            class="absolute inset-0 bg-gradient-to-r from-purple-50/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          ></div>
          <div class="relative z-10 flex items-start justify-between">
            <div>
              <p class="text-sm font-medium text-gray-500">Reports Generated</p>
              <h3 class="text-2xl font-bold mt-1 text-gray-800">
                {{ formatNumber(stats.reports) }}
              </h3>
              <div class="flex items-center mt-2">
                <span
                  :class="[
                    'text-xs font-medium px-1.5 py-0.5 rounded',
                    stats.reportChange >= 0
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800',
                  ]"
                >
                  {{ stats.reportChange >= 0 ? '+' : '' }}{{ stats.reportChange }}%
                </span>
                <span class="text-xs text-gray-500 ml-2">vs last month</span>
              </div>
            </div>
            <div class="p-2 bg-purple-100 rounded-lg text-purple-600">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
          </div>
        </router-link>
      </div>

      <!-- Charts Section -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <!-- User Growth Chart -->
        <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div class="flex items-center justify-between mb-4">
            <h3 class="font-semibold text-gray-800">User Growth</h3>
            <div class="flex space-x-2">
              <button class="text-xs px-2 py-1 rounded bg-gray-100 text-gray-600 hover:bg-gray-200">
                Monthly
              </button>
              <button class="text-xs px-2 py-1 rounded hover:bg-gray-100 text-gray-600">
                Yearly
              </button>
            </div>
          </div>
          <div class="h-64">
            <canvas ref="userChart"></canvas>
          </div>
        </div>

        <!-- Requests Status Chart -->
        <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div class="flex items-center justify-between mb-4">
            <h3 class="font-semibold text-gray-800">Requests Status</h3>
            <router-link
              to="/upgradeRequests"
              class="text-xs text-emerald-600 hover:text-emerald-700 flex items-center"
            >
              View all
              <svg class="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </router-link>
          </div>
          <div class="h-64">
            <canvas ref="requestsChart"></canvas>
          </div>
        </div>
      </div>

      <!-- Recent Activity -->
      <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div class="flex items-center justify-between mb-4">
          <h3 class="font-semibold text-gray-800">Recent Activity</h3>
          <router-link
            to="/admin/activity"
            class="text-xs text-emerald-600 hover:text-emerald-700 flex items-center"
          >
            View all
            <svg class="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </router-link>
        </div>
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  User
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Action
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Details
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Time
                </th>
                <th
                  scope="col"
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Status
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr
                v-for="(activity, index) in recentActivities"
                :key="index"
                class="hover:bg-gray-50"
              >
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="flex-shrink-0 h-10 w-10">
                      <div
                        class="h-10 w-10 rounded-full bg-gradient-to-br from-emerald-400 to-green-500 flex items-center justify-center text-white font-medium"
                      >
                        {{ getUserInitials(activity.user) }}
                      </div>
                    </div>
                    <div class="ml-4">
                      <div class="text-sm font-medium text-gray-900">{{ activity.user }}</div>
                      <div class="text-sm text-gray-500">{{ activity.userEmail }}</div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ activity.action }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-500">{{ activity.details }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-500">{{ formatTime(activity.time) }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span
                    :class="[
                      'px-2 inline-flex text-xs leading-5 font-semibold rounded-full',
                      activity.status === 'Completed'
                        ? 'bg-green-100 text-green-800'
                        : activity.status === 'Pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800',
                    ]"
                  >
                    {{ activity.status }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Chart, registerables } from 'chart.js'
import AdminSidebar from '../../components/AdminSideBar.vue'

Chart.register(...registerables)

const userInitials = 'AD'

const stats = ref({
  totalUsers: 0,
  userChange: 12.5,
  requests: 0,
  requestChange: -3.2,
  livestock: 0,
  livestockChange: 8.7,
  reports: 0,
  reportChange: 24.1,
})

const recentActivities = ref([
  {
    user: 'John Doe',
    userEmail: 'john@example.com',
    action: 'Account Upgrade',
    details: 'Requested premium membership',
    time: new Date(Date.now() - 3600000),
    status: 'Pending',
  },
  {
    user: 'Jane Smith',
    userEmail: 'jane@example.com',
    action: 'Livestock Added',
    details: 'Added 5 new cattle listings',
    time: new Date(Date.now() - 7200000),
    status: 'Completed',
  },
  {
    user: 'Robert Johnson',
    userEmail: 'robert@example.com',
    action: 'Profile Update',
    details: 'Changed contact information',
    time: new Date(Date.now() - 10800000),
    status: 'Completed',
  },
  {
    user: 'Emily Davis',
    userEmail: 'emily@example.com',
    action: 'Report Generated',
    details: 'Monthly sales report',
    time: new Date(Date.now() - 14400000),
    status: 'Completed',
  },
  {
    user: 'Michael Wilson',
    userEmail: 'michael@example.com',
    action: 'Account Deletion',
    details: 'Requested account removal',
    time: new Date(Date.now() - 18000000),
    status: 'Pending',
  },
])

const userChart = ref(null)
const requestsChart = ref(null)

onMounted(() => {
  // Count all user entries in localStorage
  const userKeys = Object.keys(localStorage).filter((key) => key.startsWith('user_'))
  stats.value.totalUsers = userKeys.length

  // Get other stats
  const requests = JSON.parse(localStorage.getItem('upgradeRequests') || '[]')
  const livestock = JSON.parse(localStorage.getItem('livestock') || '[]')
  const reports = JSON.parse(localStorage.getItem('reports') || '[]')

  stats.value.requests = requests.length
  stats.value.livestock = livestock.length
  stats.value.reports = reports.length

  // Initialize charts
  initUserChart()
  initRequestsChart()
})

const formatNumber = (num: number | bigint) => {
  return new Intl.NumberFormat().format(num)
}

const formatTime = (date: number | Date | undefined) => {
  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    day: 'numeric',
    month: 'short',
  }).format(date)
}

const getUserInitials = (name: string) => {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
}

const initUserChart = () => {
  // @ts-ignore
  new Chart(userChart.value, {
    type: 'line',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      datasets: [
        {
          label: 'New Users',
          data: [120, 190, 170, 220, 250, 280, 310, 290, 330, 380, 410, 450],
          borderColor: '#10B981',
          backgroundColor: 'rgba(16, 185, 129, 0.05)',
          borderWidth: 2,
          fill: true,
          tension: 0.4,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            drawBorder: false,
          },
        },
        x: {
          grid: {
            display: false,
          },
        },
      },
    },
  })
}

const initRequestsChart = () => {
  // @ts-ignore
  new Chart(requestsChart.value, {
    type: 'doughnut',
    data: {
      labels: ['Approved', 'Pending', 'Rejected'],
      datasets: [
        {
          data: [45, 15, 5],
          backgroundColor: ['#10B981', '#F59E0B', '#EF4444'],
          borderWidth: 0,
          borderRadius: 4,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '70%',
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            usePointStyle: true,
            padding: 20,
          },
        },
      },
    },
  })
}
</script>

<style scoped>
/* Smooth transitions for all elements */
* {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background: rgba(229, 231, 235, 0.3);
  border-radius: 3px;
}

::-webkit-scrollbar-thumb {
  background: rgba(16, 185, 129, 0.3);
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(16, 185, 129, 0.5);
}
</style>
