import { test } from '@playwright/test';
import { BasePage } from '../models/base-page';

test.describe('Nurse Seed Test', () => {
  let basePage: BasePage;

  test.beforeEach(async ({ page }) => {
    basePage = new BasePage(page);
  });

  test('seed', async ({ page }) => {
      // Navigate to base URL and wait for login page
      await basePage.goto();
      await page.waitForURL(/.*\/login/);
      await page.waitForLoadState('networkidle');

      // Fill email - use NURSE_USERNAME
      const nurseUsername = process.env.NURSE_USERNAME;
      const nursePassword = process.env.NURSE_PASSWORD;

      await page.locator('#username').fill(nurseUsername!);

      // Fill password - use NURSE_PASSWORD
      await page.locator('#password').fill(nursePassword!);
      await page.getByText('Sign in').click();

      // Wait for successful login - assuming physicians go to admin area
      await page.waitForURL(/.*\/admin/);
  });
});
