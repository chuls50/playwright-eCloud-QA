import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  timeout: 45000, // 45 seconds
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
    // Allure attachments
    actionTimeout: 10000,
    navigationTimeout: 30000,
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chrome-desktop',
      use: { 
        ...devices['Desktop Chrome'],
        viewport: { width: 1920, height: 1080 },
      },
    },
    {
      name: 'firefox-desktop',
      use: {
        ...devices['Desktop Firefox'],
        viewport: { width: 1920, height: 1080 },
      },
    },
  ],

});
