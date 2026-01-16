import { test as base, Page } from '@playwright/test';
import { getCurrentEnvironment, getCurrentUserCredentials } from '../data/environments';
import { LoginPage } from '../pages/login.page';

type AuthenticatedUser = {
  page: Page;
  loginPage: LoginPage;
};

type PhysicianAuthFixture = AuthenticatedUser;
type AdminAuthFixture = AuthenticatedUser;
type NurseAuthFixture = AuthenticatedUser;

// Base fixture for login functionality
export const test = base.extend<{
  loginPage: LoginPage;
  physicianAuth: PhysicianAuthFixture;
  adminAuth: AdminAuthFixture;
  nurseAuth: NurseAuthFixture;
}>({
  // Login page fixture
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },

  // Physician authentication fixture
  physicianAuth: async ({ page }, use) => {
    const env = getCurrentEnvironment();
    const credentials = getCurrentUserCredentials('physician');
    
    const loginPage = new LoginPage(page);
    
    try {
      await page.goto(env.baseUrl);
      await page.waitForURL(/.*\/login/, { timeout: 10000 });
      await loginPage.login(credentials.username, credentials.password);
      await page.waitForURL(/.*\/admin/, { timeout: 15000 });
      
      console.log(`✅ Physician authenticated on ${env.name} with ${credentials.username}`);
      
      await use({
        page,
        loginPage
      });
    } catch (error) {
      console.error('❌ Physician authentication failed:', error);
      throw error;
    }
  },

  // Admin authentication fixture
  adminAuth: async ({ page }, use) => {
    const env = getCurrentEnvironment();
    const credentials = getCurrentUserCredentials('admin');
    
    const loginPage = new LoginPage(page);
    
    try {
      await page.goto(env.baseUrl);
      await page.waitForURL(/.*\/login/, { timeout: 10000 });
      await loginPage.login(credentials.username, credentials.password);
      await page.waitForURL(/.*\/admin/, { timeout: 15000 });
      
      console.log(`✅ Admin authenticated on ${env.name} with ${credentials.username}`);
      
      await use({
        page,
        loginPage
      });
    } catch (error) {
      console.error('❌ Admin authentication failed:', error);
      throw error;
    }
  },

  // Nurse authentication fixture  
  nurseAuth: async ({ page }, use) => {
    const env = getCurrentEnvironment();
    const credentials = getCurrentUserCredentials('nurse');
    
    const loginPage = new LoginPage(page);
    
    try {
      await page.goto(env.baseUrl);
      await page.waitForURL(/.*\/login/, { timeout: 10000 });
      await loginPage.login(credentials.username, credentials.password);
      await page.waitForURL(/.*\/admin/, { timeout: 15000 });
      
      console.log(`✅ Nurse authenticated on ${env.name} with ${credentials.username}`);
      
      await use({
        page,
        loginPage
      });
    } catch (error) {
      console.error('❌ Nurse authentication failed:', error);
      throw error;
    }
  }
});

export { expect } from '@playwright/test';