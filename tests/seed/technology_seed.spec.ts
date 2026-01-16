import { test } from '@playwright/test';
import { BasePage } from '../pages/base.page';
import { getCurrentEnvironment, getCurrentUserCredentials } from '../data/environments';

test.describe('Technology Seed Test', () => {
  let basePage: BasePage;

  test.beforeEach(async ({ page }) => {
    basePage = new BasePage(page);
  });

  test('seed', async ({ page }) => {
      const env = getCurrentEnvironment();
      const technologyCredentials = getCurrentUserCredentials('technology');
      
      console.log(`Running technology seed on ${env.name}`);
      console.log(`Using credentials for: ${technologyCredentials.username}`);
      
      // Navigate to base URL and wait for login page
      await basePage.goto();
      await page.waitForURL(/.*\/login/);
      await page.waitForLoadState('networkidle');

      // Fill email - use dynamic technology credentials
      const technologyUsername = technologyCredentials.username;
      const technologyPassword = technologyCredentials.password;

      await page.locator('#username').fill(technologyUsername!);

      // Fill password - use TECHNOLOGY_PASSWORD
      await page.locator('#password').fill(technologyPassword!);
      await page.waitForTimeout(500);
      await page.getByText('Sign in').click();

      // Wait for successful login - assuming physicians go to admin area
      await page.waitForURL(/.*\/admin/);
  });
});
