import { test } from '@playwright/test';
import { BasePage } from '../pages/base.page';
import { getCurrentEnvironment, getCurrentUserCredentials } from '../data/environments';

test.describe('Nurse Seed Test', () => {
  let basePage: BasePage;

  test.beforeEach(async ({ page }) => {
    basePage = new BasePage(page);
  });

  test('seed', async ({ page }) => {
      const env = getCurrentEnvironment();
      const nurseCredentials = getCurrentUserCredentials('nurse');
      
      console.log(`Running nurse seed on ${env.name}`);
      console.log(`Using credentials for: ${nurseCredentials.username}`);
      
      // Navigate to base URL and wait for login page
      await basePage.goto();
      await page.waitForURL(/.*\/login/);
      await page.waitForLoadState('networkidle');

      // Fill email - use dynamic nurse credentials
      const nurseUsername = nurseCredentials.username;
      const nursePassword = nurseCredentials.password;

      await page.locator('#username').fill(nurseUsername!);

      // Fill password - use NURSE_PASSWORD
      await page.locator('#password').fill(nursePassword!);
      await page.waitForTimeout(1000);
      await page.getByText('Sign in').click();

      // Wait for successful login - assuming physicians go to admin area
      await page.waitForURL(/.*\/admin/);
  });
});
