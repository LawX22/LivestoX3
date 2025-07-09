<template>
  <component :is="marketComponent" />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import BuyerMarket from '../../components/Market/BuyerMarket.vue'
import FarmerMarket from '../../components/Market/FarmerMarket.vue'

const router = useRouter()
const marketComponent = ref()

onMounted(() => {
  const user = JSON.parse(localStorage.getItem('user') || 'null')

  if (!user || !user.role) {
    // Redirect to login if user is not found
    router.push('/signin')
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
