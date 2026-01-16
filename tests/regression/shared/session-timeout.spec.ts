// spec: Session Management and Timeout
// seed: tests/seed/physician_seed.spec.ts

import { test, expect } from '../../fixtures/auth.fixtures';
import { getCurrentEnvironment } from '../../data/environments';
import { TEST_DATA } from '../../data/test-data';
import { LoginPage } from '../../pages/login.page';

test('Verify Session Timeout and Security', async ({ physicianAuth }) => {
  const env = getCurrentEnvironment();
  const { page } = physicianAuth;
  const physicianData = TEST_DATA.users.physician;
  const loginPage = new LoginPage(page);

  // Step 1: Login as physician user (handled by physicianAuth fixture)
  // Step 2: Verify dashboard is accessible
  await test.step('Verify physician dashboard is accessible after login', async () => {
    // Verify we're on the dashboard and user info is displayed
    await expect(page.getByText(physicianData.displayName)).toBeVisible();
    await expect(page).toHaveURL(/.*\/admin/);
  });

  // Step 3: Allow session to remain idle for extended period (simulate timeout)
  await test.step('Simulate session timeout by expiring authentication tokens', async () => {
    // Simulate session expiration by manipulating authentication cookies
    await page.evaluate(() => {
      // Find and expire any session-related cookies
      document.cookie.split(';').forEach(function(cookie) {
        const eqPos = cookie.indexOf('=');
        const name = eqPos > -1 ? cookie.substring(0, eqPos).trim() : cookie.trim();
        if (name.toLowerCase().includes('session') || 
            name.toLowerCase().includes('auth') || 
            name.toLowerCase().includes('token')) {
          document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/';
        }
      });
      return 'Session cookies expired';
    });
  });

  // Step 4: Attempt to access protected resource
  await test.step('Attempt to access protected resource after session timeout', async () => {
    // Try to access the protected admin dashboard
    await page.goto(env.baseUrl + '/admin/index.html');
  });

  // Step 5: Verify session timeout behavior
  await test.step('Verify session timeout behavior and security', async () => {
    // Verify user is redirected to login page
    await expect(page).toHaveURL(/.*\/login/);
    
    // Verify login form is displayed using page objects (PHI data is not exposed)
    await expect(loginPage.usernameField).toBeVisible();
    await expect(loginPage.passwordField).toBeVisible();
    await expect(loginPage.signInButton).toBeVisible();
  });

  // Additional verification: Ensure no dashboard content remains visible
  await test.step('Verify no sensitive data remains accessible', async () => {
    // Ensure we cannot see any dashboard content or user information using TEST_DATA
    await expect(page.getByText(physicianData.displayName)).not.toBeVisible();
    await expect(page.getByText('Pending')).not.toBeVisible();
    await expect(page.getByText('Reviewed')).not.toBeVisible();
    
    // Verify we're completely logged out by checking for login page elements using page objects
    await expect(loginPage.signInButton).toBeVisible();
    await expect(loginPage.usernameField).toBeVisible();
  });
});
