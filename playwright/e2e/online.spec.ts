import { expect, test } from '../support/fixtures'

test('website should be online', async ({ page }) => {
  await page.goto('/')

  await expect(page).toHaveTitle(/Velô by Papito/)
})
