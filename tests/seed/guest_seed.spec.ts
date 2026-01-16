import { test } from '@playwright/test';
import { BasePage } from '../pages/base.page';
import { getCurrentEnvironment, getCurrentUserCredentials } from '../data/environments';

test.describe('Guest Seed Test', () => {
  let basePage: BasePage;

  test.beforeEach(async ({ page }) => {
    basePage = new BasePage(page);
  });

  test('seed', async ({ page }) => {
      const env = getCurrentEnvironment();
      const guestCredentials = getCurrentUserCredentials('guest');
      
      console.log(`Running guest seed on ${env.name}`);
      console.log(`Using credentials for: ${guestCredentials.username}`);
      
      // Navigate to base URL and wait for login page
      await basePage.goto();
      await page.waitForURL(/.*\/login/);
      await page.waitForLoadState('networkidle');

      // Fill email - use dynamic guest credentials
      const guestUsername = guestCredentials.username;
      const guestPassword = guestCredentials.password;

      await page.locator('#username').fill(guestUsername!);

      // Fill password - use GUEST_PASSWORD
      await page.locator('#password').fill(guestPassword!);
      await page.waitForTimeout(500);
      await page.getByText('Sign in').click();

      // Wait for successful login - assuming physicians go to admin area
      await page.waitForURL(/.*\/admin/);
  });
});
