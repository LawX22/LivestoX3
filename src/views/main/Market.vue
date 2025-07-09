<template>
  <component :is="marketComponent" />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import BuyerMarket from '../../components/Market/BuyerMarket.vue'
import FarmerMarket from '../../components/Market/FarmerMarket.vue'

const marketComponent = ref(BuyerMarket) // Default to BuyerMarket

onMounted(() => {
  const user = JSON.parse(localStorage.getItem('user') || 'null')

  if (!user || !user.role) {
    return
  }

  switch (user.role) {
    case 'Farmer':
      marketComponent.value = FarmerMarket
      break
    case 'Buyer':
      marketComponent.value = BuyerMarket
      break
    default:
      marketComponent.value = BuyerMarket
  }
})
</script>
