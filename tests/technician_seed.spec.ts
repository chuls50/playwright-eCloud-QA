import { test } from '@playwright/test';
import { BasePage } from './models/base-page';

test.describe('Technician Seed Test', () => {
  let basePage: BasePage;

  test.beforeEach(async ({ page }) => {
    basePage = new BasePage(page);
  });

  test('seed', async ({ page }) => {
      // Navigate to base URL and wait for login page
      await basePage.goto();
      await page.waitForURL(/.*\/login/);
      await page.waitForLoadState('networkidle');

      // Fill email - use TECHNICIAN_USERNAME
      const technicianUsername = process.env.TECHNICIAN_USERNAME;
      const technicianPassword = process.env.TECHNICIAN_PASSWORD;

      await page.locator('#username').fill(technicianUsername!);

      // Fill password - use TECHNICIAN_PASSWORD
      await page.locator('#password').fill(technicianPassword!);
      await page.getByText('Sign in').click();

      // Wait for successful login - assuming physicians go to admin area
      await page.waitForURL(/.*\/admin/);
  });
});
