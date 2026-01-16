// spec: Login - Valid Credentials
// seed: tests/seed/physician_seed.spec.ts

import { test, expect } from '../../fixtures/auth.fixtures';
import { TEST_DATA } from '../../data/test-data';
import { DashboardPage } from '../../pages/dashboard.page';
import { getCurrentUserCredentials } from '../../data/environments';

test('Verify Complete Valid Login Flow @[123780] @physician @ui', async ({ page, loginPage }) => {
  const physicianData = TEST_DATA.users.physician;
  
  // Step 1: Navigate to the eCloud application login page
  await test.step('Navigate to login page', async () => {
    await loginPage.goto();
  });
  
  // Step 2: Verify the login page displays username and password fields
  await test.step('Verify login page elements', async () => {
    await expect(loginPage.usernameField).toBeVisible();
    await expect(loginPage.passwordField).toBeVisible();
    await expect(loginPage.signInButton).toBeVisible();
  });
  
  // Step 3 & 4: Enter valid physician credentials
  await test.step('Enter physician credentials', async () => {
    // Get environment-specific credentials
    const credentials = getCurrentUserCredentials('physician');
    
    await loginPage.usernameField.fill(credentials.username);
    await loginPage.passwordField.fill(credentials.password);
    
    // Verify username field accepts alphanumeric input
    await expect(loginPage.usernameField).toHaveValue(credentials.username);
    
    // Verify password field masks input characters
    await expect(loginPage.passwordField).toHaveAttribute('type', 'password');
  });
  
  // Step 5: Click the 'Sign in' button
  await test.step('Submit login form', async () => {
    await loginPage.signInButton.click();
    await page.waitForLoadState('networkidle');
  });
  
  // Step 6: Verify successful redirect to physician dashboard (/admin)
  await test.step('Verify successful authentication', async () => {
    await expect(page).toHaveURL(/.*\/admin/);
    
    const dashboardPage = new DashboardPage(page);
    await dashboardPage.verifyDashboardLoaded();
  });

});

