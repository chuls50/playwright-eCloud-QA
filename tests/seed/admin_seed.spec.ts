import { test } from '@playwright/test';
import { BasePage } from '../models/base-page';

test.describe('Test group', () => {
  let basePage: BasePage;

  test.beforeEach(async ({ page }) => {
    basePage = new BasePage(page);
  });

  test('seed', async ({ page }) => {
      // Navigate to base URL and wait for login page
      await basePage.goto();
      await page.waitForURL(/.*\/login/);
      await page.waitForLoadState('networkidle');

      // Fill email - use ADMIN_USERNAME
      const adminUsername = process.env.ADMIN_USERNAME;
      const adminPassword = process.env.ADMIN_PASSWORD;

      await page.locator('#username').fill(adminUsername!);

      // Fill password - use ADMIN_PASSWORD
      await page.locator('#password').fill(adminPassword!);
      await page.getByText('Sign in').click();

      // Wait for successful login - assuming physicians go to admin area
      await page.waitForURL(/.*\/admin/);
  });
});
