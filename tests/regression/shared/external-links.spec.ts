import { test, expect } from '@playwright/test';
import { TEST_DATA } from '../../data/test-data';
import { LoginPage } from '../../pages/login.page';
import { getCurrentEnvironment } from '../../data/environments';

test('Verify GlobalMed External Links @[123785] @physician @ui', async ({ page }) => {
  const environment = getCurrentEnvironment();
  const loginPage = new LoginPage(page);
  const loginUrl = `${environment.baseUrl}/login/index.html`;
  
  await test.step('Navigate to login page', async () => {
    await page.goto(loginUrl);
    await expect(page).toHaveTitle('eNcounter®Cloud');
  });

  await test.step('Verify Send feedback link presence and href attribute', async () => {
    await expect(loginPage.sendFeedbackLink).toBeVisible();
    await expect(loginPage.sendFeedbackLink).toHaveAttribute('href', TEST_DATA.externalLinks.sendFeedback);
  });

  await test.step('Verify Legal information link presence and href attribute', async () => {
    await expect(loginPage.legalInfoLink).toBeVisible();
    await expect(loginPage.legalInfoLink).toHaveAttribute('href', TEST_DATA.externalLinks.legalInfo);
  });

  await test.step('Verify Privacy statement link presence and href attribute', async () => {
    await expect(loginPage.privacyStatementLink).toBeVisible();
    await expect(loginPage.privacyStatementLink).toHaveAttribute('href', TEST_DATA.externalLinks.privacyStatement);
  });

  await test.step('Test Send feedback link navigation', async () => {
    await loginPage.sendFeedbackLink.click();
    await page.waitForTimeout(1000);
    await page.waitForLoadState('networkidle');
    // The link goes to contact-us but redirects to contact
    await expect(page).toHaveURL('https://www.globalmed.com/contact');
    await page.goBack();
    await expect(page).toHaveURL(loginUrl);
  });

  await test.step('Test Legal information link navigation', async () => {
    await loginPage.legalInfoLink.click();
    await page.waitForTimeout(1000);
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(TEST_DATA.externalLinks.legalInfo);
    await page.goBack();
    await expect(page).toHaveURL(loginUrl);
  });

  await test.step('Test Privacy statement link navigation', async () => {
    await loginPage.privacyStatementLink.click();
    await page.waitForTimeout(1000);
    await page.waitForLoadState('networkidle');
    // The link goes to legal/privacy-statement but redirects to privacy-statement
    await expect(page).toHaveURL('https://www.globalmed.com/privacy-statement');
    await page.goBack();
    await expect(page).toHaveURL(loginUrl);
  });
});