<!-- FarmerDashboard.vue -->
<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Sticky Navbar -->
    <NavBar />

    <!-- Dashboard Layout -->
    <div class="p-4 md:p-6 max-w-7xl mx-auto">
      <!-- Header Section -->
      <div class="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
        <div>
          <h1 class="text-2xl md:text-3xl font-bold text-green-800">Farmer Dashboard</h1>
          <p class="text-gray-600">Manage your farm operations and livestock sales</p>
        </div>
      </div>

      <!-- Stats Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-500 uppercase tracking-wider">Total Listings</p>
              <p class="text-2xl font-bold text-gray-900 mt-1">12</p>
            </div>
            <div class="p-3 rounded-lg bg-green-100 text-green-600">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
          </div>
          <p class="text-xs text-gray-500 mt-2">
            <span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
              <svg class="-ml-1 mr-0.5 h-3 w-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clip-rule="evenodd" />
              </svg>
              15% increase
            </span>
            from last month
          </p>
        </div>

        <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-500 uppercase tracking-wider">Active Listings</p>
              <p class="text-2xl font-bold text-gray-900 mt-1">8</p>
            </div>
            <div class="p-3 rounded-lg bg-blue-100 text-blue-600">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
          </div>
          <p class="text-xs text-gray-500 mt-2">
            <span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
              342 views this month
            </span>
          </p>
        </div>

        <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-500 uppercase tracking-wider">Total Revenue</p>
              <p class="text-2xl font-bold text-gray-900 mt-1">₱185,000</p>
            </div>
            <div class="p-3 rounded-lg bg-purple-100 text-purple-600">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <p class="text-xs text-gray-500 mt-2">
            <span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
              <svg class="-ml-1 mr-0.5 h-3 w-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clip-rule="evenodd" />
              </svg>
              8% increase
            </span>
            from last month
          </p>
        </div>

        <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-500 uppercase tracking-wider">Messages</p>
              <p class="text-2xl font-bold text-gray-900 mt-1">3</p>
            </div>
            <div class="p-3 rounded-lg bg-yellow-100 text-yellow-600">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </div>
          </div>
          <p class="text-xs text-gray-500 mt-2">
            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
              3 unread
            </span>
          </p>
        </div>
      </div>

      <!-- Main Content Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Left Column -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Recent Listings Section -->
          <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div class="px-4 py-5 sm:px-6 border-b border-gray-200">
              <h3 class="text-lg font-medium leading-6 text-gray-900">Your Recent Livestock Posts</h3>
              <p class="mt-1 text-sm text-gray-500">Listings you've recently added or updated</p>
            </div>
            <div class="divide-y divide-gray-200">
              <div>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4">
                  <div class="group relative rounded-lg border border-gray-200 bg-white overflow-hidden hover:shadow-md transition-shadow">
                    <div class="relative h-40">
                      <img
                        src="https://images.unsplash.com/photo-1545468800-85cc9bc6ecf7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                        alt="Cattle"
                        class="w-full h-full object-cover"
                      />
                      <div class="absolute top-2 right-2">
                        <span class="px-2 py-1 text-xs font-bold rounded-full shadow-sm bg-green-100 text-green-800">
                          Available
                        </span>
                      </div>
                    </div>
                    <div class="p-4">
                      <div class="flex justify-between items-start">
                        <div>
                          <h3 class="font-semibold text-gray-900 group-hover:text-green-600 transition-colors">
                            Cattle
                          </h3>
                          <p class="text-sm text-green-600 font-medium">Angus</p>
                        </div>
                        <p class="font-bold text-gray-900">₱45,000</p>
                      </div>
                      <div class="mt-3 flex justify-between items-center">
                        <div class="flex items-center text-sm text-gray-500">
                          <svg class="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          Today
                        </div>
                        <router-link
                          to="/yourLivestock/edit/1"
                          class="text-sm font-medium text-green-600 hover:text-green-700"
                        >
                          Edit
                        </router-link>
                      </div>
                    </div>
                  </div>

                  <div class="group relative rounded-lg border border-gray-200 bg-white overflow-hidden hover:shadow-md transition-shadow">
                    <div class="relative h-40">
                      <img
                        src="https://images.unsplash.com/photo-1531366936337-7c912a4589a7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                        alt="Pig"
                        class="w-full h-full object-cover"
                      />
                      <div class="absolute top-2 right-2">
                        <span class="px-2 py-1 text-xs font-bold rounded-full shadow-sm bg-green-100 text-green-800">
                          Available
                        </span>
                      </div>
                    </div>
                    <div class="p-4">
                      <div class="flex justify-between items-start">
                        <div>
                          <h3 class="font-semibold text-gray-900 group-hover:text-green-600 transition-colors">
                            Pig
                          </h3>
                          <p class="text-sm text-green-600 font-medium">Large White</p>
                        </div>
                        <p class="font-bold text-gray-900">₱12,000</p>
                      </div>
                      <div class="mt-3 flex justify-between items-center">
                        <div class="flex items-center text-sm text-gray-500">
                          <svg class="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          1 day ago
                        </div>
                        <router-link
                          to="/yourLivestock/edit/2"
                          class="text-sm font-medium text-green-600 hover:text-green-700"
                        >
                          Edit
                        </router-link>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="px-4 py-4 bg-gray-50 text-right sm:px-6">
                  <router-link
                    to="/yourLivestock"
                    class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    View All Listings
                  </router-link>
                </div>
              </div>
            </div>
          </div>

          <!-- Revenue Trends Section -->
          <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div class="px-4 py-5 sm:px-6 border-b border-gray-200">
              <h3 class="text-lg font-medium leading-6 text-gray-900">Revenue Trends</h3>
              <p class="mt-1 text-sm text-gray-500">Your sales performance over time</p>
            </div>
            <div class="p-4">
              <div class="h-64">
                <canvas ref="revenueChart"></canvas>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Column -->
        <div class="space-y-6">
          <!-- Quick Stats Section -->
          <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div class="px-4 py-5 sm:px-6 border-b border-gray-200">
              <h3 class="text-lg font-medium leading-6 text-gray-900">Quick Stats</h3>
              <p class="mt-1 text-sm text-gray-500">Your livestock statistics at a glance</p>
            </div>
            <div class="px-4 py-5 sm:p-6">
              <div class="space-y-4">
                <div>
                  <h4 class="text-sm font-medium text-gray-500 mb-2">Livestock Distribution</h4>
                  <div class="h-48">
                    <canvas ref="livestockChart"></canvas>
                  </div>
                </div>
                <div>
                  <h4 class="text-sm font-medium text-gray-500 mb-2">Status Overview</h4>
                  <div class="space-y-3">
                    <div class="flex items-center">
                      <div class="w-3 h-3 rounded-full mr-2 bg-green-500"></div>
                      <div class="flex-1">
                        <div class="flex justify-between text-sm">
                          <span class="font-medium text-gray-700">Available</span>
                          <span class="text-gray-500">8 (67%)</span>
                        </div>
                        <div class="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                          <div class="h-1.5 rounded-full bg-green-500" style="width: 67%"></div>
                        </div>
                      </div>
                    </div>

                    <div class="flex items-center">
                      <div class="w-3 h-3 rounded-full mr-2 bg-yellow-500"></div>
                      <div class="flex-1">
                        <div class="flex justify-between text-sm">
                          <span class="font-medium text-gray-700">Low Stock</span>
                          <span class="text-gray-500">2 (17%)</span>
                        </div>
                        <div class="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                          <div class="h-1.5 rounded-full bg-yellow-500" style="width: 17%"></div>
                        </div>
                      </div>
                    </div>

                    <div class="flex items-center">
                      <div class="w-3 h-3 rounded-full mr-2 bg-red-500"></div>
                      <div class="flex-1">
                        <div class="flex justify-between text-sm">
                          <span class="font-medium text-gray-700">Out of Stock</span>
                          <span class="text-gray-500">1 (8%)</span>
                        </div>
                        <div class="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                          <div class="h-1.5 rounded-full bg-red-500" style="width: 8%"></div>
                        </div>
                      </div>
                    </div>

                    <div class="flex items-center">
                      <div class="w-3 h-3 rounded-full mr-2 bg-blue-500"></div>
                      <div class="flex-1">
                        <div class="flex justify-between text-sm">
                          <span class="font-medium text-gray-700">Pending Review</span>
                          <span class="text-gray-500">1 (8%)</span>
                        </div>
                        <div class="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                          <div class="h-1.5 rounded-full bg-blue-500" style="width: 8%"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Recent Messages Section -->
          <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div class="px-4 py-5 sm:px-6 border-b border-gray-200">
              <h3 class="text-lg font-medium leading-6 text-gray-900">Recent Messages</h3>
              <p class="mt-1 text-sm text-gray-500">Latest inquiries about your listings</p>
            </div>
            <div class="divide-y divide-gray-200">
              <div>
                <ul class="divide-y divide-gray-200">
                  <li class="px-4 py-4 sm:px-6">
                    <div class="flex items-start">
                      <img class="h-10 w-10 rounded-full" src="https://randomuser.me/api/portraits/men/32.jpg" alt="Juan Dela Cruz" />
                      <div class="ml-3 flex-1">
                        <div class="flex items-center justify-between">
                          <h4 class="text-sm font-medium text-gray-900">Juan Dela Cruz</h4>
                          <span class="text-xs text-gray-500">1 hour ago</span>
                        </div>
                        <p class="text-sm text-gray-500 mt-1">
                          Hello, I'm interested in your Angus cattle. Are they still available?
                        </p>
                        <div class="mt-2 flex space-x-3">
                          <button class="text-xs font-medium text-green-600 hover:text-green-700">
                            Reply
                          </button>
                          <button class="text-xs font-medium text-gray-600 hover:text-gray-700">
                            View Listing
                          </button>
                        </div>
                      </div>
                      <span class="ml-2 flex-shrink-0">
                        <span class="h-2 w-2 rounded-full bg-green-500"></span>
                      </span>
                    </div>
                  </li>

                  <li class="px-4 py-4 sm:px-6">
                    <div class="flex items-start">
                      <img class="h-10 w-10 rounded-full" src="https://randomuser.me/api/portraits/women/44.jpg" alt="Maria Santos" />
                      <div class="ml-3 flex-1">
                        <div class="flex items-center justify-between">
                          <h4 class="text-sm font-medium text-gray-900">Maria Santos</h4>
                          <span class="text-xs text-gray-500">1 day ago</span>
                        </div>
                        <p class="text-sm text-gray-500 mt-1">
                          Can you provide more details about the vaccination history of the pigs?
                        </p>
                        <div class="mt-2 flex space-x-3">
                          <button class="text-xs font-medium text-green-600 hover:text-green-700">
                            Reply
                          </button>
                          <button class="text-xs font-medium text-gray-600 hover:text-gray-700">
                            View Listing
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
                <div class="px-4 py-4 bg-gray-50 text-right sm:px-6">
                  <router-link
                    to="/messages"
                    class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    View All Messages
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from '../../components/NavBar.vue'
import { Chart, registerables } from 'chart.js'

export default {
  components: {
    NavBar
  },
  data() {
    return {
      livestockChart: null,
      revenueChart: null
    }
  },
  mounted() {
    // Register all Chart.js components
    Chart.register(...registerables)
    
    // Initialize livestock distribution chart (Doughnut)
    this.initLivestockChart()
    
    // Initialize revenue trends chart (Line)
    this.initRevenueChart()
  },
  beforeUnmount() {
    // Clean up charts to prevent memory leaks
    if (this.livestockChart) {
      this.livestockChart.destroy()
    }
    if (this.revenueChart) {
      this.revenueChart.destroy()
    }
  },
  methods: {
    initLivestockChart() {
      const ctx = this.$refs.livestockChart.getContext('2d')
      this.livestockChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['Cattle', 'Pigs', 'Goats', 'Sheep', 'Poultry'],
          datasets: [{
            data: [35, 25, 20, 10, 10],
            backgroundColor: [
              '#10B981', // green
              '#3B82F6', // blue
              '#F59E0B', // yellow
              '#8B5CF6', // purple
              '#EC4899'  // pink
            ],
            borderWidth: 0
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          cutout: '70%',
          plugins: {
            legend: {
              position: 'bottom',
              labels: {
                boxWidth: 12,
                padding: 20,
                usePointStyle: true,
                pointStyle: 'circle'
              }
            }
          }
        }
      })
    },
    initRevenueChart() {
      const ctx = this.$refs.revenueChart.getContext('2d')
      this.revenueChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
          datasets: [{
            label: 'Monthly Revenue',
            data: [120000, 135000, 145000, 155000, 165000, 175000, 185000],
            borderColor: '#10B981',
            backgroundColor: 'rgba(16, 185, 129, 0.05)',
            fill: true,
            tension: 0.3,
            borderWidth: 2,
            pointBackgroundColor: '#10B981',
            pointRadius: 4,
            pointHoverRadius: 6
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false
            },
            tooltip: {
              callbacks: {
                label: function(context) {
                  return '₱' + context.raw.toLocaleString()
                }
              }
            }
          },
          scales: {
            x: {
              grid: {
                display: false
              }
            },
            y: {
              beginAtZero: false,
              ticks: {
                callback: function(value) {
                  return '₱' + value.toLocaleString()
                }
              },
              grid: {
                drawBorder: false
              }
            }
          }
        }
      })
    }
  }
}
</script>
