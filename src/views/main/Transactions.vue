<template>
  <component :is="transactionsComponent" />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import BuyerTransactions from '../../components/Transactions/BuyerTransactions.vue';
import FarmerTransactions from '../../components/Transactions/FarmerTransactions.vue';
import { useRouter } from 'vue-router';

const transactionsComponent = ref();
const router = useRouter();

onMounted(() => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  if (user.role === 'Buyer') {
    transactionsComponent.value = BuyerTransactions;
  } else if (user.role === 'Farmer') {
    transactionsComponent.value = FarmerTransactions;
  } else {
    router.push('/signin');
  }
});
</script>
