<template>
  <component :is="dashboardComponent" />
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import BuyerDashboard from '@/components/Dashboard/BuyerDashboard.vue'
import FarmerDashboard from '@/components/Dashboard/FarmerDashboard.vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authContext'

const dashboardComponent = ref()
const router = useRouter()
const authStore = useAuthStore()

watchEffect(() => {
  const user = authStore.user

  if (!user) return

  if (user.role === 'Buyer') {
    dashboardComponent.value = BuyerDashboard
  } else if (user.role === 'Farmer') {
    dashboardComponent.value = FarmerDashboard
  } else {
    router.push('/signin')
  }
})
</script>
