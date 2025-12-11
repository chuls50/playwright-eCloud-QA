import { test } from '@playwright/test';
import { BasePage } from '../models/base-page';

test.describe('Institution Manager Seed Test', () => {
  let basePage: BasePage;

  test.beforeEach(async ({ page }) => {
    basePage = new BasePage(page);
  });

  test('seed', async ({ page }) => {
      // Navigate to base URL and wait for login page
      await basePage.goto();
      await page.waitForURL(/.*\/login/);
      await page.waitForLoadState('networkidle');

      // Fill email - use INSTITUTION_MANAGER_USERNAME
      const institutionManagerUsername = process.env.INSTITUTION_MANAGER_USERNAME;
      const institutionManagerPassword = process.env.INSTITUTION_MANAGER_PASSWORD;

      await page.locator('#username').fill(institutionManagerUsername!);

      // Fill password - use INSTITUTION_MANAGER_PASSWORD
      await page.locator('#password').fill(institutionManagerPassword!);
      await page.getByText('Sign in').click();

      // Wait for successful login - assuming physicians go to admin area
      await page.waitForURL(/.*\/admin/);
  });
});