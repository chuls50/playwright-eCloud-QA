import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';
import { TEST_DATA } from '../data/test-data';

export class LoginPage extends BasePage {
  
  // Locators
  readonly usernameField: Locator;
  readonly passwordField: Locator;
  readonly signInButton: Locator;
  readonly errorMessage: Locator;
  
  // External links
  readonly sendFeedbackLink: Locator;
  readonly legalInfoLink: Locator;
  readonly privacyStatementLink: Locator;
  readonly facebookLink: Locator;
  readonly twitterLink: Locator;
  readonly youtubeLink: Locator;
  readonly linkedinLink: Locator;

  constructor(page: Page) {
    super(page);
    
    // Form elements
    this.usernameField = page.locator('#username');
    this.passwordField = page.locator('#password');
    this.signInButton = page.getByText('Sign in');
    this.errorMessage = page.locator('.error-message'); // Adjust selector as needed
    
    // External links
    this.sendFeedbackLink = page.getByRole('link', { name: 'Send feedback' });
    this.legalInfoLink = page.getByRole('link', { name: 'Legal information' });
    this.privacyStatementLink = page.getByRole('link', { name: 'Privacy statement' });
    this.facebookLink = page.locator('a[href*="facebook.com/globalmed"]');
    this.twitterLink = page.locator('a[href*="twitter.com/GlobalMed_USA"]');
    this.youtubeLink = page.locator('a[href*="youtube.com/user/GlobalMediaTelemed"]');
    this.linkedinLink = page.locator('a[href*="linkedin.com/company/839991"]');
  }

  /**
   * Navigate to login page
   */
  async goto() {
    await super.goto(); // Uses environment-aware navigation
    await this.page.waitForURL(/.*\/login/);
    await this.waitForLoad();
  }

  /**
   * Perform login with credentials
   */
  async login(username: string, password: string) {
    await this.usernameField.fill(username);
    await this.passwordField.fill(password);
    await this.signInButton.click();
  }

  /**
   * Check if login form is visible
   */
  async isLoginFormVisible() {
    return await this.usernameField.isVisible() && 
           await this.passwordField.isVisible() && 
           await this.signInButton.isVisible();
  }

  /**
   * Verify login page elements
   */
  async verifyLoginPageElements() {
    await this.usernameField.isVisible();
    await this.passwordField.isVisible();
    await this.signInButton.isVisible();
  }

  /**
   * Verify external links are present with correct hrefs
   */
  async verifyExternalLinks() {
    const links = [
      { locator: this.sendFeedbackLink, expectedHref: TEST_DATA.externalLinks.sendFeedback },
      { locator: this.legalInfoLink, expectedHref: TEST_DATA.externalLinks.legalInfo },
      { locator: this.privacyStatementLink, expectedHref: TEST_DATA.externalLinks.privacyStatement },
      { locator: this.facebookLink, expectedHref: TEST_DATA.externalLinks.socialMedia.facebook },
      { locator: this.twitterLink, expectedHref: TEST_DATA.externalLinks.socialMedia.twitter },
      { locator: this.youtubeLink, expectedHref: TEST_DATA.externalLinks.socialMedia.youtube },
      { locator: this.linkedinLink, expectedHref: TEST_DATA.externalLinks.socialMedia.linkedin }
    ];

    for (const link of links) {
      await link.locator.isVisible();
      const href = await link.locator.getAttribute('href');
      if (href !== link.expectedHref) {
        throw new Error(`Link href mismatch. Expected: ${link.expectedHref}, Got: ${href}`);
      }
    }
  }
}