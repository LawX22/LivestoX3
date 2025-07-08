<template>
  <component :is="marketComponent" />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import BuyerMarket from '../../components/Market/BuyerMarket.vue';
import FarmerMarket from '../../components/Market/FarmerMarket.vue';

const marketComponent = ref();

onMounted(() => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  if (user.role === 'Buyer') {
    marketComponent.value = BuyerMarket;
  } else if (user.role === 'Farmer') {
    marketComponent.value = FarmerMarket;
  } else {
    // Guest defaults to BuyerMarket (in guest mode)
    marketComponent.value = BuyerMarket;
  }
});
</script>
