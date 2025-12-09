import { test, expect, Page } from '@playwright/test';
import { BasePage } from '../../models/base-page.js';

test.describe('Physician Dashboard @physician', () => {
  let basePage: BasePage;

  test.beforeEach(async ({ page }) => {
    basePage = new BasePage(page);
    await basePage.performPhysicianLogin();
    await expect(page).toHaveURL(/.*\/admin/);
  });

  test('Verify Physician Dashboard Includes "Pending" Tab for Unreviewed Studies @[36486]', async ({
    page,
  }) => {
    // 1. Login as physician (completed in beforeEach)

    // 2. Select the Pending tab on the dashboard
    const pendingTab = page.locator('#button-pending');
    await pendingTab.click();

    // 3. Verify that unreviewed studies are displayed in the Pending tab
    await expect(page.locator('#content-data')).toBeVisible();
    await expect(page.getByRole('img').nth(1)).toBeVisible();

    // 4. Verify the stsudies display the following attributes: Patient Name, Passcode, Consult type, Date, Time, Modality Type
    const patientName = page.locator('.caption > .title').first();
    const passcode = page.locator('.col-12.subtitle').first();
    const consultType = page.locator('.col-12.detail-a').first();
    const datetime = page.locator('.col-12.detail-b').first();
    const modalityType = page.locator('.col-12.thumb-modality').first();

    await expect(patientName).toBeVisible();
    await expect(passcode).toBeVisible();
    await expect(consultType).toBeVisible();
    await expect(datetime).toBeVisible();
    await expect(modalityType).toBeVisible();
  });

  test('Verify Physician Dashboard includes "Reviewed" Tab for Studies @[36488]', async ({
    page,
  }) => {
    // 1. Login as physician (completed in beforeEach)

    // 2. Select the Reviewed tab on the dashboard
    const reviewedTab = page.locator('#button-reviewed');
    await reviewedTab.click();

    // 3. Verify that reviewed studies are displayed in the Reviewed tab
    await expect(page.locator('#content-data')).toBeVisible();
    await expect(page.getByRole('img').nth(1)).toBeVisible();

    // 4. Verify the studies display the following attributes: Patient Name, Passcode, Consult type, Date, Time, Reviewed by, Reviewed date, Reviewed time
    const patientName = page.locator('.caption > .title').first();
    const passcode = page.locator('.subtitle').first();
    const consultType = page.locator('.detail-a').first();
    const datetime = page.locator('.long-detail-b').first();
    const reviewedBy = page.locator('.detail-c').first();
    const reviewedDateTime = page.locator('.detail-d').first();

    await expect(patientName).toBeVisible();
    await expect(passcode).toBeVisible();
    await expect(consultType).toBeVisible();
    await expect(datetime).toBeVisible();
    await expect(reviewedBy).toBeVisible();
    await expect(reviewedDateTime).toBeVisible();
  });

  test('Verify Physician Dashboard includes "Study Search" Tab @[36496]', async ({ page }) => {
    // 1. Login as physician (completed in beforeEach)

    // 2. Select the Study Search tab on the dashboard
    const studySearchTab = page.locator('#button-studies');
    await studySearchTab.click();

    // 3. Validate the screen displays options at the top right: Today, Yesterday, - 7 days, - 30 days, Search
    const todayButton = page.locator('#button-search-today');
    const yesterdayButton = page.locator('#button-search-yesterday');
    const last7DaysButton = page.locator('#button-search-last-7-days');
    const last30DaysButton = page.locator('#button-search-last-30-days');
    const searchButton = page.locator('#button-search');

    await expect(todayButton).toBeVisible();
    await expect(yesterdayButton).toBeVisible();
    await expect(last7DaysButton).toBeVisible();
    await expect(last30DaysButton).toBeVisible();
    await expect(searchButton).toBeVisible();

    // 4. Select the search button , verify the 'Study Search' modal
    await searchButton.click();

    const studySearchModalHeader = page.getByRole('heading', { name: 'Search Study' });
    const patientIdInput = page.getByRole('textbox', { name: 'Patient ID' });
    const lastNameInput = page.getByRole('textbox', { name: 'Last Name' });
    const fromDateInput = page.getByRole('textbox', { name: 'From Date' });
    const toDateInput = page.getByRole('textbox', { name: 'To Date' });
    const modalityDropdown = page.locator('#modality');
    const searchModalButton = page.getByRole('link', { name: 'Search' });
    const cancelModalButton = page.getByRole('link', { name: 'Cancel' });

    await expect(studySearchModalHeader).toBeVisible();
    await expect(patientIdInput).toBeVisible();
    await expect(lastNameInput).toBeVisible();
    await expect(fromDateInput).toBeVisible();
    await expect(toDateInput).toBeVisible();
    await expect(modalityDropdown).toBeVisible();
    await expect(searchModalButton).toBeVisible();
    await expect(cancelModalButton).toBeVisible();
  });

  // This test should be implimented by Mocking the API
  // "one-way-door"
  test.skip('Verify functionality of "Reviewed" Tab (physician can review pending studies) @[36487]', async ({
    page,
  }) => {});

  test('Verify functionality of "Study Search" Tab (physician can search for studies) @[123725]', async ({
    page,
  }) => {
    // 1. Login as physician (completed in beforeEach)

    // 2. Select the Study Search tab on the dashboard
    const studySearchTab = page.locator('#button-studies');
    await studySearchTab.click();

    // 3. Validate the screen displays options at the top right: Today, Yesterday, - 7 days, - 30 days, Search
    const todayButton = page.locator('#button-search-today');
    const yesterdayButton = page.locator('#button-search-yesterday');
    const last7DaysButton = page.locator('#button-search-last-7-days');
    const last30DaysButton = page.locator('#button-search-last-30-days');
    const searchButton = page.locator('#button-search').first();

    await expect(todayButton).toBeVisible();
    await expect(yesterdayButton).toBeVisible();
    await expect(last7DaysButton).toBeVisible();
    await expect(last30DaysButton).toBeVisible();
    await expect(searchButton).toBeVisible();

    // 4. Select the search button , verify the 'Study Search' modal
    await searchButton.click();

    // 5. Input search criteria and select Search
    const TEST_DATA_LAST_NAME = 'Smith';
    const TEST_DATA_FIRST_NAME = 'Bob';

    // 5.1 search by last name
    const lastNameInput = page.getByRole('textbox', { name: 'Last Name' });
    await lastNameInput.fill(TEST_DATA_LAST_NAME);
    const searchModalButton = page.getByRole('link', { name: 'Search' });
    await searchModalButton.click();
    // verify search by last name
    await expect(page.getByRole('link', { name: 'Bob Smith Passcode:' })).toBeVisible();
    await page.waitForTimeout(1000); // wait for a second to avoid overlapping actions

    // 5.2 search by first name
    await searchButton.click();
    const firstNameInput = page.getByRole('textbox', { name: 'First Name' });
    await firstNameInput.fill(TEST_DATA_FIRST_NAME);
    await lastNameInput.fill('');
    await searchModalButton.click();
    // verify search by first name
    await expect(page.getByRole('link', { name: 'Bob Smith Passcode:' })).toBeVisible();
  });
});
