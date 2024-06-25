import { test, expect } from '@playwright/test';

test('Check API page', async ({ page }) => {
    await page.goto('https://playwright.dev/');
    await expect(page).toHaveTitle(/Playwright/);
    await page.getByRole('link', { name: 'API' }).click();
    await expect(page).toHaveURL(/.*class-playwright/)
    await expect(page).toHaveTitle(/Playwright Library/)
  });

  test('Check Community page', async ({ page }) => {
    await page.goto('https://playwright.dev/');
    await expect(page).toHaveTitle(/Playwright/);
    await page.getByRole('link', { name: 'Community' }).click();
    await expect(page).toHaveURL(/.*welcome/)
    await expect(page).toHaveTitle(/Welcome/)
  })

  test('Ambassadors', async ({ page }) => {
    await page.goto('https://playwright.dev/');
    await expect(page).toHaveTitle(/Playwright/);
    await page.getByRole('link', { name: 'Community' }).click();
    await page.locator('.pagination-nav__sublabel').click();
    await expect(page).toHaveTitle(/Ambassadors/);
  })