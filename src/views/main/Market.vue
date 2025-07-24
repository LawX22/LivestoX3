<!-- Market.vue -->
<template>
  <component :is="marketComponent" />
</template>

<script setup lang="ts">
import { onMounted, shallowRef } from 'vue'
import BuyerMarket from '../../components/Market/BuyerMarket.vue'
import FarmerMarket from '../../components/Market/FarmerMarket.vue'

// Use shallowRef for dynamic component binding
const marketComponent = shallowRef<typeof BuyerMarket | typeof FarmerMarket>(BuyerMarket)

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
