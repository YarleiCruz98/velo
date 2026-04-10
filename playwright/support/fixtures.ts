import { test as base } from '@playwright/test'

import { createSearchOrderActions } from './actions/searchOrderActions'

type App = {
  searchOrder: ReturnType<typeof createSearchOrderActions>
}

export const test = base.extend<{ app: App }>({
  app: async ({ page }, use) => {
    const app: App = {
      searchOrder: createSearchOrderActions(page),
    }
    await use(app)
  },
})

export { expect } from '@playwright/test'
