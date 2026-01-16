import { test, expect } from '@playwright/test';
import { BasePage } from '../pages/base.page';
import { getCurrentEnvironment, getCurrentUserCredentials } from '../data/environments';

test.describe('Physician Seed Test', () => {
  let basePage: BasePage;

  test.beforeEach(async ({ page }) => {
    basePage = new BasePage(page);
  });

  test('seed', async ({ page }) => {
      const env = getCurrentEnvironment();
      const physicianCredentials = getCurrentUserCredentials('physician');
      
      console.log(`Running physician seed on ${env.name}`);
      console.log(`Using credentials for: ${physicianCredentials.username}`);
      
      // Navigate to base URL and wait for login page
      await basePage.goto();
      await page.waitForURL(/.*\/login/);
      await page.waitForLoadState('networkidle');

      // Fill email - use dynamic physician credentials
      const physicianUsername = physicianCredentials.username;
      const physicianPassword = physicianCredentials.password;

      await page.locator('#username').fill(physicianUsername!);

      // Fill password - use PHYSICIAN_PASSWORD
      await page.locator('#password').fill(physicianPassword!);
      await page.waitForTimeout(1000);
      await page.getByText('Sign in').click();

      // Wait for successful login - assuming physicians go to admin area
      await page.waitForURL(/.*\/admin/);
  });
});
