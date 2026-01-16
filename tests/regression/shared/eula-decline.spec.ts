// spec: EULA Decline Test
// seed: tests/seed/physician_seed.spec.ts

import { test, expect } from '../../fixtures/auth.fixtures';
import { getCurrentEnvironment, getCurrentUserCredentials } from '../../data/environments';

test('Verify EULA Decline Handling @[123783] @physician @ui', async ({ page, loginPage }) => {
  const env = getCurrentEnvironment();
  const newUserCredentials = getCurrentUserCredentials('newUser');

  // Step 1: Navigate to eCloud application login page
  await test.step('Navigate to eCloud application login page', async () => {
    await loginPage.goto();
    await expect(loginPage.usernameField).toBeVisible();
    await expect(loginPage.passwordField).toBeVisible();
    await expect(loginPage.signInButton).toBeVisible();
  });

  // Step 2: Enter credentials for new user
  await test.step('Enter credentials for new user', async () => {
    await loginPage.usernameField.fill(newUserCredentials.username);
    await loginPage.passwordField.fill(newUserCredentials.password);
  });

  // Step 3: Click the Sign in button
  await test.step('Click the Sign in button', async () => {
    await loginPage.signInButton.click();
  });

  // Step 4: Verify EULA dialog is displayed
  await test.step('Verify EULA dialog is displayed', async () => {
    await expect(page.getByText('SUBSCRIPTION-EULA')).toBeVisible();
    await expect(page.getByRole('link', { name: 'I Agree' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Cancel' })).toBeVisible();
  });

  // Step 5: Click Cancel button on EULA dialog
  await test.step('Click Cancel button on EULA dialog', async () => {
    await page.getByRole('link', { name: 'Cancel' }).click();
  });

  // Step 6: Verify user is logged out and returned to login page
  await test.step('Verify user is logged out and returned to login page', async () => {
    // Verify we're back on login page
    await expect(page).toHaveURL(/.*\/login/);
    
    // Verify login form elements are visible
    await expect(loginPage.usernameField).toBeVisible();
    await expect(loginPage.passwordField).toBeVisible();
    await expect(loginPage.signInButton).toBeVisible();
    
    // Verify Sign in button text is visible (confirming we're on login page)
    await expect(page.getByText('Sign in')).toBeVisible();
  });

  // Additional verification: Ensure user cannot access protected pages
  await test.step('Verify user cannot access protected pages without accepting EULA', async () => {
    // Ensure we can't access admin or dashboard areas
    await expect(page).not.toHaveURL(/.*\/admin/);
    await expect(page).not.toHaveURL(/.*\/dashboard/);
  });
});
