//
import { defineConfig, devices } from '@playwright/test';
import * as os from 'os';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  //timeout for the whole test run. This prevents excess resource usage when everything went wrong
  globalTimeout: 60 * 60 * 1000,
  expect: {
    // toMatchSnapshot: { threshold: 0.5 },
    // Đây là thời gian chờ tối đa cho các hàm expect trong test
    //maximum time expect() should wait for the condition to be met
    //await expect(locator).toHaveText();    
    timeout: 10 * 1000,
  },
  //general test timeout in the config
  //maximum time for each test
  //thời gian chờ tối đa cho một test case
  timeout: 60 * 1000,

  testDir: './tests/inprogress',
  // testMatch: ["tests/inprogress/basicInteractions.test.ts"],
  /* Run tests in files in parallel */
  // fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  // retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    //Action timeout	
    actionTimeout: 5000, // Maximum time in milliseconds to wait for action to finish
    //Timeout for each navigation action:
    navigationTimeout: 30000,
    //not work - hope to see screenshot here after running test
    screenshot: 'on',
    //not work - hope to see video here after running test
    video: {
      mode: 'on',
      // mode:'retain-on-failure',//prefer this to reduce report size
      size: { width: 1920, height: 1080 },
    },
    launchOptions: {
      //slowMo literally slows down browser interactions.
      slowMo: 1000,
    },
    headless: false,
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://127.0.0.1:3000',
    baseURL: 'https://dev.mathgpt.ai/',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },
  retries: 2,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  /*
  reporter: [
    ['line'],
    ['dot'],
    ['list', { printSteps: true }],
    ['blob', { outputDir: 'reports/blob', fileName: `blob-report-${os.platform()}.zip` }],
    //html report way 2: losing html structure here
    ['html', { outputFolder: 'reports/html' }],
    ['json', { outputFile: 'reports/json/json-report.json' }],
    ['junit', { outputFile: 'reports/junit/junit-report.xml' }],
    ['github', { outputDir: 'reports/github/github-report' }],
  ],
  */
  /* Configure projects for major browsers */
  projects: [
    // {
    //   name: 'chromium',
    //   use: { ...devices['Desktop Chrome'] },
    // },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
