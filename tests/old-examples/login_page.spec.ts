import { test, expect } from '@playwright/test';
import { BasePage } from '../../models/base-page';

const TEST_DATA = {
  newUser: {
    username: process.env.NEW_USER_USERNAME,
    password: process.env.NEW_USER_PASSWORD,
  },
};

test.describe('Login Page @unauthenticated', () => {
  let basePage: BasePage;

  test.beforeEach(async ({ page }) => {
    basePage = new BasePage(page);
    await basePage.goto();
  });

  test('The login page shall allow user to log in @[36003]', async ({ page }) => {
    await basePage.performPhysicianLogin();
    await expect(page).toHaveURL(/admin/);
  });

  test('The login page shall display links that redirect the user to the GlobalMed Pages @[36013]', async ({ page }) => {
    const sendFeedbackLink = page.getByRole('link', { name: 'Send feedback' });
    const legalInformationLink = page.getByRole('link', { name: 'Legal Information' });
    const privacyStatementLink = page.getByRole('link', { name: 'Privacy Statement' });

    await expect(sendFeedbackLink).toHaveAttribute('href', 'https://www.globalmed.com/contact-us/');
    await expect(legalInformationLink).toHaveAttribute('href', 'https://www.globalmed.com/legal');
    await expect(privacyStatementLink).toHaveAttribute('href', 'https://www.globalmed.com/legal/privacy-statement');

    // Verify navigation to each link
    await sendFeedbackLink.click();
    await expect(page).toHaveURL('https://www.globalmed.com/contact');
    await page.goBack();

    await legalInformationLink.click();
    await expect(page).toHaveURL('https://www.globalmed.com/legal');
    await page.goBack();

    await privacyStatementLink.click();
    await expect(page).toHaveURL('https://www.globalmed.com/privacy-statement');
    await page.goBack();

    // Confirm we are back on the login page by verifying the URL contains /login
    await expect(page).toHaveURL(/.*\/login/);
  });

  test('The login page shall display links that redirect the user to GlobalMeds Facebook, Twitter, YouTube, and LinkedIn pages @[36015]', async ({ page }) => {
    const facebookLink = page.getByRole('link').nth(1);
    const twitterLink = page.getByRole('link').nth(2);
    const youtubeLink = page.getByRole('link').nth(3);
    const linkedInLink = page.getByRole('link').nth(4);

    await expect(facebookLink).toHaveAttribute('href', 'https://www.facebook.com/globalmed');
    await expect(twitterLink).toHaveAttribute('href', 'https://twitter.com/GlobalMed_USA');
    await expect(youtubeLink).toHaveAttribute('href', 'https://www.youtube.com/user/GlobalMediaTelemed');
    await expect(linkedInLink).toHaveAttribute('href', 'https://www.linkedin.com/company/839991');

    // Verify navigation to each social media link
    await facebookLink.click();
    await expect(page).toHaveURL('https://www.facebook.com/globalmed');
    await page.goBack();

    await twitterLink.click();
    await expect(page).toHaveURL('https://x.com/GlobalMed_USA');
    await page.goBack();

    await youtubeLink.click();
    await expect(page).toHaveURL('https://www.youtube.com/user/GlobalMediaTelemed');
    await page.goBack();

    await linkedInLink.click();
    await expect(page).toHaveURL('https://www.linkedin.com/uas/login?session_redirect=%2Fcompany%2F839991');
    await page.goBack();

    // Confirm we are back on the login page by verifying the URL contains /login
    await expect(page).toHaveURL(/.*\/login/);
  });


  test('Upon first login, system shall require users to accept an end user license agreement before proceeding @[36650]', async ({ page }) => {
    // Login with new user credentials
    await page.getByRole('textbox', { name: 'Username' }).click();
    await page.getByRole('textbox', { name: 'Username' }).fill(TEST_DATA.newUser.username!);
    await page.getByRole('textbox', { name: 'Password' }).click();
    await page.getByRole('textbox', { name: 'Password' }).fill(TEST_DATA.newUser.password!);
    await page.getByText('Sign in').click();

    // Verify that the EULA is displayed
    await expect(page.getByText('SUBSCRIPTION-EULA You ("')).toBeVisible();
    await expect(page.getByRole('link', { name: 'I Agree' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Cancel' })).toBeVisible();

    // Verify clicking decline on the EULA logs the user out and returns to the login page
    await page.getByRole('link', { name: 'Cancel' }).click();
    await expect(page).toHaveURL(/.*\/login/);
  });


});
