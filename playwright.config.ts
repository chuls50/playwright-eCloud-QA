import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 1, // Allow 1 retry locally for stability
  workers: process.env.CI ? 1 : 2, // Limit workers to reduce resource conflicts
  timeout: 60000, // 60 seconds - increased for auth flows
  expect: {
    timeout: 15000, // 15 seconds for expect assertions
  },
  reporter: [
    ['list'],
    ['html', { open: 'never' }],
    ['allure-playwright', {
      outputFolder: 'allure-results',
      suiteTitle: true,
      categories: [
        {
          name: 'Broken tests',
          matchedStatuses: ['broken']
        },
        {
          name: 'Failed tests',
          matchedStatuses: ['failed']
        },
        {
          name: 'Flaky tests',
          matchedStatuses: ['passed', 'failed']
        }
      ]
    }]
  ],
  use: {
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    // Increased timeouts for stability
    actionTimeout: 15000,
    navigationTimeout: 45000,
    // Better test isolation
    baseURL: undefined, // Let tests specify their own URLs
    ignoreHTTPSErrors: true,
    // Allure attachments
    launchOptions: {
      slowMo: process.env.CI ? 0 : 100, // Slow down in local mode for stability
    },
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chrome-desktop',
      use: { 
        ...devices['Desktop Chrome'],
      },
    },
  ],

});
