import { test } from '@playwright/test';
import { BasePage } from '../pages/base.page';
import { getCurrentEnvironment, getCurrentUserCredentials } from '../data/environments';

test.describe('Institution Manager Seed Test', () => {
  let basePage: BasePage;

  test.beforeEach(async ({ page }) => {
    basePage = new BasePage(page);
  });

  test('seed', async ({ page }) => {
      const env = getCurrentEnvironment();
      const institutionManagerCredentials = getCurrentUserCredentials('institutionManager');
      
      console.log(`Running institution manager seed on ${env.name}`);
      console.log(`Using credentials for: ${institutionManagerCredentials.username}`);
      
      // Navigate to base URL and wait for login page
      await basePage.goto();
      await page.waitForURL(/.*\/login/);
      await page.waitForLoadState('networkidle');

      // Fill email - use dynamic institution manager credentials
      const institutionManagerUsername = institutionManagerCredentials.username;
      const institutionManagerPassword = institutionManagerCredentials.password;

      await page.locator('#username').fill(institutionManagerUsername!);

      // Fill password - use INSTITUTION_MANAGER_PASSWORD
      await page.locator('#password').fill(institutionManagerPassword!);
      await page.waitForTimeout(1000);
      await page.getByText('Sign in').click();

      // Wait for successful login - assuming physicians go to admin area
      await page.waitForURL(/.*\/admin/);
  });
});