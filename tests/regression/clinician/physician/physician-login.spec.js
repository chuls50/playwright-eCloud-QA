import { test, expect } from '../../../fixtures/auth.fixtures';
import { DashboardPage } from '../../../pages/dashboard.page';

test('Physician Authentication using Fixture', async ({ physicianAuth }) => {
  // This test uses the physicianAuth fixture which automatically handles login
  const { page } = physicianAuth;

  // The fixture has already logged in the physician
  // Test starts with authenticated physician user

  await test.step('Verify physician is authenticated', async () => {
    await expect(page).toHaveURL(/.*\/admin/);

    const dashboardPage = new DashboardPage(page);
    await dashboardPage.verifyDashboardLoaded();
  });

  // Continue with test logic that requires authenticated physician...
});
