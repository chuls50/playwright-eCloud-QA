import { test, expect } from '../../../fixtures/auth.fixtures';
import { DashboardPage } from '../../../pages/dashboard.page';

test.describe('Physician Authentication', () => {
  test('should authenticate physician and access dashboard', async ({ physicianAuth }) => {
    // This test uses the physicianAuth fixture which automatically handles login
    const { page } = physicianAuth;

    // The fixture has already logged in the physician
    // Test starts with authenticated physician user

    await test.step('Verify physician is authenticated', async () => {
      // Wait for navigation to complete
      await page.waitForLoadState('networkidle');
      await expect(page).toHaveURL(/.*\/admin/, { timeout: 15000 });

      const dashboardPage = new DashboardPage(page);
      await dashboardPage.verifyDashboardLoaded();
    });

    await test.step('Verify dashboard functionality', async () => {
      const dashboardPage = new DashboardPage(page);

      // Verify key dashboard elements are visible
      await expect(dashboardPage.pendingTab).toBeVisible();
      await expect(dashboardPage.contentData).toBeVisible();
    });

    // Continue with test logic that requires authenticated physician...
  });
});
