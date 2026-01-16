import { test } from '@playwright/test';
import { BasePage } from '../pages/base.page';
import { getCurrentEnvironment, getCurrentUserCredentials } from '../data/environments';

test.describe('Technician Seed Test', () => {
  let basePage: BasePage;

  test.beforeEach(async ({ page }) => {
    basePage = new BasePage(page);
  });

  test('seed', async ({ page }) => {
      const env = getCurrentEnvironment();
      const technicianCredentials = getCurrentUserCredentials('technician');
      
      console.log(`Running technician seed on ${env.name}`);
      console.log(`Using credentials for: ${technicianCredentials.username}`);
      
      // Navigate to base URL and wait for login page
      await basePage.goto();
      await page.waitForURL(/.*\/login/);
      await page.waitForLoadState('networkidle');

      // Fill email - use dynamic technician credentials
      const technicianUsername = technicianCredentials.username;
      const technicianPassword = technicianCredentials.password;

      await page.locator('#username').fill(technicianUsername!);

      // Fill password - use TECHNICIAN_PASSWORD
      await page.locator('#password').fill(technicianPassword!);
      await page.waitForTimeout(500);
      await page.getByText('Sign in').click();

      // Wait for successful login - assuming physicians go to admin area
      await page.waitForURL(/.*\/admin/);
  });
});
