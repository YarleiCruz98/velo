import { test, expect } from '@playwright/test';

test('website should be online', async ({ page }) => {
  await page.goto('/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Velô by Papito/);
});