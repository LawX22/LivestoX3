import { createApp } from 'vue';
import { createPinia } from 'pinia'
import router from './router';
import App from './App.vue';
import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';
import './assets/css/style.css'


const pinia = createPinia();
const app = createApp(App);
app.use(router);
app.use(PrimeVue);
app.use(ToastService);

app.use(pinia);
app.mount('#app');
