import { test, expect } from '@playwright/test';
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

      // Fill email - use PHYSICIAN_USERNAME
      const physicianUsername = process.env.PHYSICIAN_USERNAME;
      const physicianPassword = process.env.PHYSICIAN_PASSWORD;

      await page.locator('#username').fill(physicianUsername!);

      // Fill password - use PHYSICIAN_PASSWORD
      await page.locator('#password').fill(physicianPassword!);
      await page.getByText('Sign in').click();

      // Wait for successful login - assuming physicians go to admin area
      await page.waitForURL(/.*\/admin/);
  });
});
