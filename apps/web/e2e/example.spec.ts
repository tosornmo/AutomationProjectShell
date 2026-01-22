import { test, expect } from '@playwright/test';

test.describe('Homepage Tests', () => {
  test('should load homepage', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/AutomationProjectShell/);
  });

  test('should have heading', async ({ page }) => {
    await page.goto('/');
    const heading = page.locator('h1');
    await expect(heading).toBeVisible();
    await expect(heading).toContainText('AutomationProjectShell - Web');
  });

  test('should have welcome text', async ({ page }) => {
    await page.goto('/');
    const paragraph = page.locator('p');
    await expect(paragraph).toContainText('Welcome');
  });
});
