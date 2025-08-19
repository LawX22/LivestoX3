import { render } from '@testing-library/vue'
import { describe, it, expect } from 'vitest'

import App from '../src/App.vue'
import router from '../src/router'

describe('App.vue', () => {
  it('renders the landing page on default route', async () => {
    const { getByText } = render(App, {
      global: {
        plugins: [router]
      }
    })
    await router.isReady()
    expect(getByText('Find the Right Livestock for You')).toBeTruthy()
  })
})
