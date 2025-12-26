import { test, expect } from '@playwright/test';
import { BasePage } from '../../models/base-page';

test.describe('Physician Dashboard - "Pending" Tab @physician', () => {
  let basePage: BasePage;

  test.beforeEach(async ({ page }) => {
    basePage = new BasePage(page);
    await basePage.performPhysicianLogin();
    await expect(page).toHaveURL(/.*\/admin/);
  });

  test('Verify content of "Pending" tab @[36486]', async ({
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

  test.skip('Verify content of DICOM image /viewer for an unreviewed study @[123742]', async ({page}) => {
  });

  test.skip('Verify functionality of DICOM /viewer buttons for an unreviewed study (physician can review study) @[123743]', async ({page}) => {
  });

  test.skip('Verify functionality of DICOM /viewer Attach button for unreviewed study (physician can attach file) @[123747]', async ({page}) => {
  });

});

test.describe('Physician Dashboard - "Reviewed" Tab @physician', () => {
  let basePage: BasePage;

  test.beforeEach(async ({ page }) => {
    basePage = new BasePage(page);
    await basePage.performPhysicianLogin();
    await expect(page).toHaveURL(/.*\/admin/);
  });

  test('Verify content of "Reviewed" Tab @[36488]', async ({
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

  test('Verify "Study Search" Tab Allows Filtering by date ranges @[36498]', async ({ page }) => {
    // 1. Login as physician (completed in beforeEach)
    // 2. Select the Study Search tab on the dashboard
    const studySearchTab = page.locator('#button-studies');
    await studySearchTab.click();

    // 3. Validate the screen displays options at the top right: Today, Yesterday, - 7 days, - 30 days, Search
    const todayButton = page.locator('#button-search-today');
    const yesterdayButton = page.locator('#button-search-yesterday');
    const last7DaysButton = page.locator('#button-search-last-7-days');
    const last30DaysButton = page.locator('#button-search-last-30-days');

    await expect(todayButton).toBeVisible();
    await expect(yesterdayButton).toBeVisible();
    await expect(last7DaysButton).toBeVisible();
    await expect(last30DaysButton).toBeVisible();

    // 4. Select each date range button and verify studies are filtered accordingly
    await todayButton.click();
    const todayHeader = page.locator('#content-title');
    await expect(todayHeader).toBeVisible();
    await expect(todayHeader).toHaveText(/Study search: Today/);
    // Note: Verification of correct filtering would require knowledge of test data 
    // Here we just ensure that some results are shown
    await expect(page.locator('#content-data')).toBeVisible();

    await yesterdayButton.click();
    const yesterdayHeader = page.locator('#content-title');
    await expect(yesterdayHeader).toBeVisible();
    await expect(yesterdayHeader).toHaveText(/Study search: Yesterday/);
    // Note: Verification of correct filtering would require knowledge of test data 
    // Here we just ensure that some results are shown
    await expect(page.locator('#content-data')).toBeVisible();

    await last7DaysButton.click();
    const last7DaysHeader = page.locator('#content-title');
    await expect(last7DaysHeader).toBeVisible();
    await expect(last7DaysHeader).toHaveText(/Study search: Last 7 days/);
    // Note: Verification of correct filtering would require knowledge of test data 
    // Here we just ensure that some results are shown
    await expect(page.locator('#content-data')).toBeVisible();

    await last30DaysButton.click();
    const last30DaysHeader = page.locator('#content-title');
    await expect(last30DaysHeader).toBeVisible();
    await expect(last30DaysHeader).toHaveText(/Study search: Last 30 days/);
    // Note: Verification of correct filtering would require knowledge of test data 
    // Here we just ensure that some results are shown
    await expect(page.locator('#content-data')).toBeVisible();
  });

  test('Verify Physician "Account" Tab Displays Editable and Non-editable Fields @[36500]', async ({ page }) => {
    // 1. Login as physician (completed in beforeEach)

    // 2. Select the Account tab on the dashboard
    const accountTab = page.locator('#button-account');
    await accountTab.click();

    // 3. Verify the Account tab displays the following fields: Email, Address 1, Address 2, City, State, Zip, Country, Phone Number, SMS Number
    const emailField = page.getByRole('textbox', { name: 'Email Address' });
    const smsNumberField = page.getByRole('textbox', { name: 'SMS Number' });
    const specialtiesField = page.getByRole('textbox', { name: 'Specialties' });
    const address1Field = page.getByRole('textbox', { name: 'Address 1' });
    const address2Field = page.getByRole('textbox', { name: 'Address 2' });
    const cityField = page.getByRole('textbox', { name: 'City' });
    const stateField = page.getByRole('textbox', { name: 'State' });
    const countryField = page.getByRole('textbox', { name: 'Country' });
    const zipField = page.getByRole('textbox', { name: 'Zip' });
    const phoneNumberField = page.getByRole('textbox', { name: 'Phone' });

    // Validate the editable fields include Email, Address 1, Address 2, City, State, Zip, Country, Phone Number, SMS Number
    await expect(emailField).toBeVisible();
    await expect(emailField).toBeEditable();

    await expect(smsNumberField).toBeVisible();
    await expect(smsNumberField).toBeEditable();

    await expect(specialtiesField).toBeVisible();
    await expect(specialtiesField).toBeEditable();

    await expect(address1Field).toBeVisible();
    await expect(address1Field).toBeEditable();

    await expect(address2Field).toBeVisible();
    await expect(address2Field).toBeEditable();

    await expect(cityField).toBeVisible();
    await expect(cityField).toBeEditable();

    await expect(stateField).toBeVisible();
    await expect(stateField).toBeEditable();

    await expect(countryField).toBeVisible();
    await expect(countryField).toBeEditable();

    await expect(zipField).toBeVisible();
    await expect(zipField).toBeEditable();

    await expect(phoneNumberField).toBeVisible();
    await expect(phoneNumberField).toBeEditable();

    // Validate the non-editable fields include Profile, Username, User Full Name
    const profileField = page.getByRole('textbox', { name: 'Profile' });
    const usernameField = page.getByRole('textbox', { name: 'Username' });
    const userFullNameField = page.getByRole('textbox', { name: 'User Full Name' });

    await expect(profileField).toBeVisible();
    await expect(profileField).toBeDisabled();

    await expect(usernameField).toBeVisible();
    await expect(usernameField).toBeDisabled();

    await expect(userFullNameField).toBeVisible();
    await expect(userFullNameField).toBeDisabled();

    // Make a change to an editable field and save
    const address1Data = '4315 E. Thunderbird Rd';
    const address2Data = '09-195';
    const cityData = 'Phoenix';
    const stateData = 'AZ';
    const countryData = 'USA';
    const zipData = '85032';
    const phoneNumberData = '1234567890';

    await address1Field.fill(address1Data);
    await address2Field.fill(address2Data);
    await cityField.fill(cityData);
    await stateField.fill(stateData);
    await countryField.fill(countryData);
    await zipField.fill(zipData);
    await phoneNumberField.fill(phoneNumberData);
    await page.waitForTimeout(3000); // wait for 3  seconds to allow for any dynamic validation

    const saveButton = page.locator('#button-save');
    await saveButton.click();
    await page.waitForTimeout(3000); // wait for 3  seconds to allow server to respond

    // Verify that user is redirected to the Admin Dashboard after saving
    await page.waitForURL(/.*\/admin/);

    // Reset state by navigating back to Account tab and clearing the fields
    await accountTab.click();
    await address1Field.fill('');
    await address2Field.fill('');
    await cityField.fill('');
    await stateField.fill('');
    await countryField.fill('');
    await zipField.fill('');
    await phoneNumberField.fill('');
    await saveButton.click();
    await page.waitForTimeout(3000); // wait for a second to ensure save is processed

    // Verify that user is redirected to the Admin Dashboard after saving
    await expect(page).toHaveURL(/.*\/admin/);

    // Verify state has been reset
    await accountTab.click();
    await expect(address1Field).toHaveValue('');
    await expect(address2Field).toHaveValue('');
    await expect(cityField).toHaveValue('');
    await expect(stateField).toHaveValue('');
    await expect(countryField).toHaveValue('');
    await expect(zipField).toHaveValue('');
    await expect(phoneNumberField).toHaveValue('');
  });

  test('Verify Physician "Administration" Tab Redirects to Administrative Dashboard @[36501]', async ({ page }) => {
    // 1. Login as physician (completed in beforeEach)

    // 2. Select the Administration tab on the dashboard
    const administrationTab = page.locator('#button-admin');
    await administrationTab.click();

    // Verify user is redirected to the administration dashboard, starting on Patients tab
    await page.getByText('Patients').first().waitFor();
    await expect(page.getByText('Patients').first()).toBeVisible();
    await expect(page).toHaveURL(/.*\/admin\/index.html/);

    // Verify navigation to other admin tabs
    const patientsTab = page.locator('#button-patients');
    const worklistTab = page.locator('#button-worklist');
    const viewStudiesTab = page.locator('#button-view-studies');
    const accountTab = page.locator('#button-account');

    await patientsTab.click();
    await expect(page.getByText('Patients').first()).toBeVisible();

    await worklistTab.click();
    await expect(page.getByText('Worklist Items').first()).toBeVisible();

    await accountTab.click();
    await expect(page.getByText('Account').first()).toBeVisible();

    await viewStudiesTab.click();
    await expect(page.getByText('Studies pending review').first()).toBeVisible();
  });


});