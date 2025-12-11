import { test } from '@playwright/test';
import { BasePage } from './models/base-page';

test.describe('Technology Seed Test', () => {
  let basePage: BasePage;

  test.beforeEach(async ({ page }) => {
    basePage = new BasePage(page);
  });

  test('seed', async ({ page }) => {
      // Navigate to base URL and wait for login page
      await basePage.goto();
      await page.waitForURL(/.*\/login/);
      await page.waitForLoadState('networkidle');

      // Fill email - use TECHNOLOGY_USERNAME
      const technologyUsername = process.env.TECHNOLOGY_USERNAME;
      const technologyPassword = process.env.TECHNOLOGY_PASSWORD;

      await page.locator('#username').fill(technologyUsername!);

      // Fill password - use TECHNOLOGY_PASSWORD
      await page.locator('#password').fill(technologyPassword!);
      await page.getByText('Sign in').click();

      // Wait for successful login - assuming physicians go to admin area
      await page.waitForURL(/.*\/admin/);
  });
});
