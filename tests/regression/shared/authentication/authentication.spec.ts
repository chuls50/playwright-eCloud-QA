import {test, expect} from '@playwright/test';
import {BasePage} from '../../../models/base-page';
import {TEST_DATA} from '../../../data/test-data';

test.describe('Authentication and Login @authentication', () => {
  let basePage: BasePage;

    test.beforeEach(async ({page}) => {
        basePage = new BasePage(page);
        await basePage.goto();
    });

    test('Verify Complete Valid Login Flow @[123780] ', async ({page}) => {
        // Perform physician login using the BasePage method
        await basePage.performPhysicianLogin();

        // Verify that the URL is correct after login
        await expect(page).toHaveURL(/.*\/admin/);

        // Verify that physician user information is displayed
        await expect(page.getByText(TEST_DATA.users.physician.displayName)).toBeVisible();
    });

});