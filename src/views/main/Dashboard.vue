<template>
  <component :is="dashboardComponent" />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import BuyerDashboard from '../../components/Dashboard/BuyerDashboard.vue';
import FarmerDashboard from '../../components/Dashboard/FarmerDashboard.vue';
import { useRouter } from 'vue-router';

const dashboardComponent = ref();
const router = useRouter();

onMounted(() => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  if (user.role === 'Buyer') {
    dashboardComponent.value = BuyerDashboard;
  } else if (user.role === 'Farmer') {
    dashboardComponent.value = FarmerDashboard;
  } else {
    router.push('/signin');
  }
});
</script>
