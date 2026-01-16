// spec: Login - Invalid Credentials
// seed: tests/seed/physician_seed.spec.ts

import { test, expect } from '../../fixtures/auth.fixtures';
import { TEST_DATA } from '../../data/test-data';
import { getCurrentEnvironment } from '../../data/environments';
import { LoginPage } from '../../pages/login.page';

test('Verify Invalid Credentials Handling @[123781] @physician @ui', async ({ page }) => {
  const env = getCurrentEnvironment();
  const invalidCredentials = TEST_DATA.authentication.invalidCredentials;
  const expectedErrorMessage = TEST_DATA.authentication.errorMessages.authenticationFailed;
  const loginPage = new LoginPage(page);

  // Step 1: Navigate to the eCloud application login page
  await test.step('Navigate to the eCloud application login page', async () => {
    await loginPage.goto();
    await expect(loginPage.usernameField).toBeVisible();
    await expect(loginPage.passwordField).toBeVisible();
    await expect(loginPage.signInButton).toBeVisible();
  });

  // Step 2: Enter invalid username credentials
  await test.step('Enter invalid username credentials', async () => {
    await loginPage.usernameField.fill(invalidCredentials.username);
  });

  // Step 3: Enter invalid password credentials
  await test.step('Enter invalid password credentials', async () => {
    await loginPage.passwordField.fill(invalidCredentials.password);
  });

  // Step 4: Click the 'Sign in' button
  await test.step('Click the Sign in button', async () => {
    await loginPage.signInButton.click();
  });

  // Step 5: Verify appropriate error message is displayed
  await test.step('Verify appropriate error message is displayed', async () => {
    // Use the actual error message we observed during recording
    await expect(page.getByText(expectedErrorMessage)).toBeVisible();
  });

  // Step 6: Verify user remains on login page
  await test.step('Verify user remains on login page', async () => {
    await expect(page).toHaveURL(/.*\/login/);
    // Verify login form is still visible
    await expect(loginPage.usernameField).toBeVisible();
    await expect(loginPage.passwordField).toBeVisible();
    await expect(loginPage.signInButton).toBeVisible();
  });

  // Additional verification: Ensure no sensitive information is revealed
  await test.step('Verify no sensitive information is revealed in error message', async () => {
    const errorMessage = await page.getByText(expectedErrorMessage).textContent();
    expect(errorMessage?.toLowerCase()).not.toContain('password');
    expect(errorMessage?.toLowerCase()).not.toContain('username');
    expect(errorMessage?.toLowerCase()).not.toContain('credential');
  });

  // Verify user is not authenticated
  await test.step('Verify user is not authenticated', async () => {
    // Ensure we don't get redirected to any protected pages
    await expect(page).not.toHaveURL(/.*\/admin/);
    await expect(page).not.toHaveURL(/.*\/dashboard/);
  });
});
