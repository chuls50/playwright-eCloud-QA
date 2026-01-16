import { test } from '@playwright/test';
import { BasePage } from '../pages/base.page';
import { getCurrentEnvironment, getCurrentUserCredentials } from '../data/environments';

test.describe('Admin Seed Test', () => {
  let basePage: BasePage;

  test.beforeEach(async ({ page }) => {
    basePage = new BasePage(page);
  });

  test('seed', async ({ page }) => {
      const env = getCurrentEnvironment();
      const adminCredentials = getCurrentUserCredentials('admin');
      
      console.log(`Running admin seed on ${env.name}`);
      console.log(`Using credentials for: ${adminCredentials.username}`);
      
      // Navigate to base URL and wait for login page
      await basePage.goto();
      await page.waitForURL(/.*\/login/);
      await page.waitForLoadState('networkidle');

      // Fill email - use dynamic admin credentials
      const adminUsername = adminCredentials.username;
      const adminPassword = adminCredentials.password;

      await page.locator('#username').fill(adminUsername!);

      // Fill password - use ADMIN_PASSWORD
      await page.locator('#password').fill(adminPassword!);
      await page.waitForTimeout(1000);
      await page.getByText('Sign in').click();

      // Wait for successful login - assuming physicians go to admin area
      await page.waitForURL(/.*\/admin/);
  });
});
