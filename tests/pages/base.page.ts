import { Page } from '@playwright/test';
import { getCurrentEnvironment } from '../data/environments';

/**
 * Base Page Object Model
 * 
 * Provides common functionality used across all page objects.
 * Updated to use the new environment management system.
 */
export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Navigate to the application base URL based on current environment
   */
  async goto(): Promise<void> {
    const env = getCurrentEnvironment();
    await this.page.goto(env.baseUrl);
  }

  /**
   * Wait for page to be fully loaded
   */
  async waitForLoad(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
  }

  /**
   * Get current environment information
   */
  getCurrentEnv() {
    return getCurrentEnvironment();
  }

  /**
   * Common method to wait for URL pattern
   */
  async waitForURL(pattern: RegExp): Promise<void> {
    await this.page.waitForURL(pattern);
  }
}