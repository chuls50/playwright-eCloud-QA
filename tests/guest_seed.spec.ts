import { test } from '@playwright/test';
import { BasePage } from './models/base-page';

test.describe('Guest Seed Test', () => {
  let basePage: BasePage;

  test.beforeEach(async ({ page }) => {
    basePage = new BasePage(page);
  });

  test('seed', async ({ page }) => {
      // Navigate to base URL and wait for login page
      await basePage.goto();
      await page.waitForURL(/.*\/login/);
      await page.waitForLoadState('networkidle');

      // Fill email - use GUEST_USERNAME
      const guestUsername = process.env.GUEST_USERNAME;
      const guestPassword = process.env.GUEST_PASSWORD;

      await page.locator('#username').fill(guestUsername!);

      // Fill password - use GUEST_PASSWORD
      await page.locator('#password').fill(guestPassword!);
      await page.getByText('Sign in').click();

      // Wait for successful login - assuming physicians go to admin area
      await page.waitForURL(/.*\/admin/);
  });
});
