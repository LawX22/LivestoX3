import { render, fireEvent } from '@testing-library/vue'
import { describe, it, expect } from 'vitest'
import { createRouter, createWebHistory } from 'vue-router'
import adminSideBar from '../../src/components/AdminSideBar.vue'

const routes = [
  { path: '/', name: 'LandingPage', component: { template: '<div>LandingPage</div>' } },
  {
    path: '/adminDashboard',
    name: 'AdminDashboard',
    component: { template: '<div>Admin Dashboard</div>' },
  },
  {
    path: '/userManagement',
    name: 'UserManagement',
    component: { template: '<div>User Management</div>' },
  },
  {
    path: '/upgradeRequests',
    name: 'UpgradeRequests',
    component: { template: '<div>Upgrade Requests</div>' },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

describe('adminSideBar.vue', () => {
  it('renders nav items and toggles minimize state', async () => {
    const { getAllByRole, queryByText } = render(adminSideBar, {
      global: { plugins: [router] },
    })

    await router.isReady()

    expect(queryByText('Dashboard')).not.toBeNull()
    expect(queryByText('Sign Out')).not.toBeNull()

    const toggleButton = getAllByRole('button').find((btn) => btn.querySelector('svg'))
    expect(toggleButton).toBeTruthy()

    await fireEvent.click(toggleButton!)

    expect(queryByText('Dashboard')).not.toBeNull()
    expect(queryByText('Sign Out')).not.toBeNull()
  })
})
