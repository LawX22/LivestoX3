import { createRouter, createWebHistory } from 'vue-router';

// Auth Pages
import signIn from '../views/auth/signIn.vue';
import signUp from '../views/auth/signUp.vue';

// Admin Pages
import adminDashboard from '../views/admin/adminDashboard.vue';
import UserManagement from '../views/admin/userManagement.vue';
import UpgradeRequests from '../views/admin/upgradeRequests.vue';

// Main Pages
import LandingPage from '../views/main/landingPage.vue';
import Dashboard from '../views/main/Dashboard.vue';
import Transactions from '../views/main/Transactions.vue';
import Market from '../views/main/Market.vue';
import Forum from '../views/main/Forum.vue';
import upgradeForm from '../views/auth/upgradeForm.vue';
import YourLivestock from '../views/main/yourLivestock.vue';
import UserProfile from '../views/main/userProfile.vue';


// Define Routes
const routes = [
  // Auth Routes
  { path: '/signIn', component: signIn, name: 'SignIn' },
  { path: '/signUp', component: signUp, name: 'SignUp' },
  { path: '/upgradeForm', component: upgradeForm, name: 'upgradeForm' },
  { path: '/upgradeForm', component: upgradeForm, name: 'upgradeForm' },

  // Admin Routes
  { path: '/adminDashboard', component: adminDashboard, name: 'adminDashboard' },
  { path: '/userManagement', component: UserManagement, name: 'UserManagement' },
  { path: '/upgradeRequests', component: UpgradeRequests, name: 'UpgradeRequests' },

  // Main Routes
  { path: '/', component: LandingPage, name: 'LandingPage' },
  { path: '/dashboard', component: Dashboard, name: 'Dashboard' },
  { path: '/transactions', component: Transactions, name: 'Transactions' },
  { path: '/market', component: Market, name: 'Market' },
  { path: '/forum', component: Forum, name: 'Forum' },
  { path: '/yourLivestock', component: YourLivestock, name: 'YourLivestock' },
  { path: '/userProfile', component: UserProfile, name: 'UserProfile' },
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
