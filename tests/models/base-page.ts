import { Page } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config({ quiet: true });

interface LoginOptions {
  baseUrl?: string;
}

export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async performPhysicianLogin(options: LoginOptions = {}): Promise<boolean> {
    const { baseUrl = process.env.QA_ENV } = options;

    if (!baseUrl) {
      throw new Error('QA_ENV is not defined in .env file');
    }

    try {
      // Navigate to base URL and wait for login page
      await this.page.goto(baseUrl);
      await this.page.waitForURL(/.*\/login/);
      await this.page.waitForLoadState('networkidle');

      // Fill email - use PHYSICIAN_USERNAME
      const physicianUsername = process.env.PHYSICIAN_USERNAME;
      const physicianPassword = process.env.PHYSICIAN_PASSWORD;

      if (!physicianUsername || !physicianPassword) {
        throw new Error('PHYSICIAN_USERNAME or PHYSICIAN_PASSWORD is not defined in .env file');
      }

      await this.page.locator('#username').fill(physicianUsername);

      // Fill password - use PHYSICIAN_PASSWORD
      await this.page.locator('#password').fill(physicianPassword);
      await this.page.getByText('Sign in').click();

      // Wait for successful login - assuming physicians go to admin area
      await this.page.waitForURL(/.*\/admin/);
      await this.page.waitForLoadState('networkidle');

      console.log('✅ Successfully logged in as physician');
      return true;
    } catch (error) {
      console.error('❌ Failed to login as physician:', (error as Error).message);
      throw error;
    }
  }
}
