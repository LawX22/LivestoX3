import { createRouter, createWebHistory } from 'vue-router'

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
import myPurchases from '../views/main/myPurchases.vue';
import Marketplace from '../views/main/Marketplace.vue';
import Forum from '../views/main/Forum.vue';
import Messages from '../views/main/Messages.vue';
import Notifications from '../views/main/Notifications.vue';
import upgradeForm from '../views/auth/upgradeForm.vue';
import YourLivestock from '../views/main/yourLivestock.vue';
import UserProfile from '../views/main/userProfile.vue';
import Carts from '../views/main/Carts.vue';
import CheckOut from '../views/main/checkOut.vue';


// utility
import DesignSystemGuide from '../views/utility/DesignSystemGuide.vue';

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
  { path: '/myPurchases', component: myPurchases, name: 'myPurchases' },
  { path: '/marketplace', component: Marketplace, name: 'Marketplace' },
  { path: '/forum', component: Forum, name: 'Forum' },
  { path: '/messages', component: Messages, name: 'Messages' },
  { path: '/notifications', component: Notifications, name: 'Notifications' },
  { path: '/yourLivestock', component: YourLivestock, name: 'YourLivestock' },
  { path: '/userProfile', component: UserProfile, name: 'UserProfile' },
  { path: '/carts', component: Carts, name: 'Carts' },
  { path: '/checkOut', component: CheckOut, name: 'CheckOut' },

  // Utility Routes
  { path: '/DesignSystemGuide', component: DesignSystemGuide, name: 'DesignSystemGuide' },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

export default router
