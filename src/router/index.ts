import { createRouter, createWebHistory } from 'vue-router';

// Auth Pages
import signIn from '../views/auth/signIn.vue';
import signUp from '../views/auth/signUp.vue';

// Admin Pages
import adminDashboard from '../views/admin/adminDashboard.vue';

// Main Pages
import LandingPage from '../views/main/landingPage.vue';
import Dashboard from '../views/main/Dashboard.vue';
import Market from '../views/main/Market.vue';
import Forum from '../views/main/Forum.vue';
import upgradeForm from '../views/auth/upgradeForm.vue';
import UserManagement from '../views/admin/userManagement.vue';

// Define Routes
const routes = [
  // Auth Routes
  { path: '/signIn', component: signIn, name: 'SignIn' },
  { path: '/signUp', component: signUp, name: 'SignUp' },
  { path: '/upgradeForm', component: upgradeForm, name: 'upgradeForm' },

  // Admin Routes
  { path: '/adminDashboard', component: adminDashboard, name: 'adminDashboard' },
  { path: '/userManagement', component: UserManagement, name: 'UserManagement' },

  // Main Routes
  { path: '/', component: LandingPage, name: 'LandingPage' },
  { path: '/dashboard', component: Dashboard, name: 'Dashboard' },
  { path: '/market', component: Market, name: 'Market' },
  { path: '/forum', component: Forum, name: 'Forum' },
];

// Create Router
const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {

    return { top: 0 }
  }
});

export default router;
