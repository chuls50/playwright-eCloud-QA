import { test, expect } from '@playwright/test';
import { TEST_DATA } from '../../data/test-data';
import { LoginPage } from '../../pages/login.page';
import { getCurrentEnvironment } from '../../data/environments';

test('Verify GlobalMed Social Media Links @[123786] @physician @ui', async ({ page }) => {
  const environment = getCurrentEnvironment();
  const loginPage = new LoginPage(page);
  const loginUrl = `${environment.baseUrl}/login/index.html`;
  
  await test.step('Navigate to login page', async () => {
    await page.goto(loginUrl);
    await expect(page).toHaveTitle('eNcounter®Cloud');
  });

  await test.step('Verify Facebook link presence and href attribute', async () => {
    await expect(loginPage.facebookLink).toBeVisible();
    await expect(loginPage.facebookLink).toHaveAttribute('href', TEST_DATA.externalLinks.socialMedia.facebook);
  });

  await test.step('Verify Twitter link presence and href attribute', async () => {
    await expect(loginPage.twitterLink).toBeVisible();
    await expect(loginPage.twitterLink).toHaveAttribute('href', TEST_DATA.externalLinks.socialMedia.twitter);
  });

  await test.step('Verify YouTube link presence and href attribute', async () => {
    await expect(loginPage.youtubeLink).toBeVisible();
    await expect(loginPage.youtubeLink).toHaveAttribute('href', TEST_DATA.externalLinks.socialMedia.youtube);
  });

  await test.step('Verify LinkedIn link presence and href attribute', async () => {
    await expect(loginPage.linkedinLink).toBeVisible();
    await expect(loginPage.linkedinLink).toHaveAttribute('href', TEST_DATA.externalLinks.socialMedia.linkedin);
  });

  await test.step('Test Facebook link navigation', async () => {
    await loginPage.facebookLink.click();
    await expect(page).toHaveURL('https://www.facebook.com/globalmed');
    await page.goto(loginUrl);
    await expect(page).toHaveURL(loginUrl);
  });

  await test.step('Test Twitter link navigation', async () => {
    await loginPage.twitterLink.click();
    // Twitter redirects to X.com
    await expect(page).toHaveURL(/https:\/\/(twitter\.com|x\.com)\/GlobalMed_USA/);
    await page.goto(loginUrl);
    await expect(page).toHaveURL(loginUrl);
  });

  await test.step('Test YouTube link navigation', async () => {
    await loginPage.youtubeLink.click();
    await expect(page).toHaveURL(TEST_DATA.externalLinks.socialMedia.youtube);
    await page.goto(loginUrl);
    await expect(page).toHaveURL(loginUrl);
  });

  await test.step('Test LinkedIn link navigation', async () => {
    await loginPage.linkedinLink.click();
    // LinkedIn might redirect to login page but should include company reference
    await expect(page).toHaveURL(/linkedin\.com.*839991/);
    await page.goto(loginUrl);
    await expect(page).toHaveURL(loginUrl);
  });
});