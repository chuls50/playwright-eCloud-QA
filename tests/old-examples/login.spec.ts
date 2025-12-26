// spec: specs/physician-testplan3.md
// seed: tests/seed/physician_seed.spec.ts

import { test, expect } from '@playwright/test';
import { BasePage } from '../../models/base-page';

test.describe('Authentication and Login', () => {
  let basePage: BasePage;

  test.beforeEach(async ({ page }) => {
    basePage = new BasePage(page);
  });

  test('Valid Physician Login', async ({ page }) => {
    // 1. Navigate to the application base URL
    await basePage.goto();
    
    // 2. Wait for the login page to load
    await page.waitForURL(/.*\/login/);
    
    // 3. Enter valid physician username (PHYSICIAN_USERNAME environment variable)
    const physicianUsername = process.env.PHYSICIAN_USERNAME;
    await page.locator('#username').fill(physicianUsername!);
    
    // 4. Enter valid physician password (PHYSICIAN_PASSWORD environment variable)
    const physicianPassword = process.env.PHYSICIAN_PASSWORD;
    await page.locator('#password').fill(physicianPassword!);
    
    // 5. Click the 'Sign in' button
    await page.getByText('Sign in').click();
    
    // 6. Wait for successful authentication
    await page.waitForURL(/.*\/admin/);
    
    // Verify physician user information is displayed
    await expect(page.getByText('CodyMD001 Physician eCloudModern')).toBeVisible();
    
    // Verify navigation menu shows all physician sections
    await expect(page.getByText('Pending')).toBeVisible();
    await expect(page.getByText('Reviewed')).toBeVisible();
    await expect(page.getByText('Administration')).toBeVisible();
    await expect(page.getByText('Account')).toBeVisible();
  });
});