//
import { defineConfig, devices } from '@playwright/test';
import * as os from 'os';
// import MyReporter from './reports/my-awesome-reporter';
// @ts-ignore
import MyReporter from './reports/my-awesome-reporter';
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
    timeout: 30 * 1000,
  },
  //general test timeout in the config
  //maximum time for each test
  //thời gian chờ tối đa cho một test case
  timeout: 60 * 1000,

  //for real test
  // testDir: './tests/pom/testcases/educator',
  //for studying
  // testDir: './tests/study/inprogress',
  //for specific test
  testMatch: ['playwright_may17/tests/pom/base/addToCartUsingFixture.test.ts',],

  // Concise 'dot' for CI, default 'list' when running locally
  // When the test is executed from CI, it will pick the dot reporter, but if it's run locally, it will show a list report in the console.
  //reporter: process.env.CI ? 'dot' : 'list',

  // testMatch: ["tests/pomtest/*.test.ts"],
  /* Run tests in files in parallel */
  // fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  // retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  // reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    //Action timeout	
    actionTimeout: 30000, // Maximum time in milliseconds to wait for action to finish
    //Timeout for each navigation action:
    navigationTimeout: 30000,
    //not work - hope to see screenshot here after running test
    screenshot: {
      mode: 'on',
    },
    //not work - hope to see video here after running test
    video: {
      mode: 'on',
      // mode:'retain-on-failure',//prefer this to reduce report size
      size: { width: 1920, height: 1080 },
    },
    launchOptions: {
      //slowMo literally slows down browser interactions.
      slowMo: 500,
    },
    // headless: false,//need to set as true for running in CI
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://127.0.0.1:3000',
    // baseURL: 'https://dev.mathgpt.ai/',
    baseURL: "https://ecommerce-playground.lambdatest.io/index.php?",


    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',

    
  },
  // retries: 1,

  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  //Built-in Reporters
  reporter: [
    // ['html'],
    //not recommended github report as it's not easy to read
    // ['github', { outputDir: 'reports/github/github-report' }],

    //custom reporter
    ['./reports/my-awesome-reporter.js'],

    ['line'],
    // ['dot'],
    //['list', { printSteps: true }],
    ['blob', { outputDir: 'reports/blob', fileName: `blob-report-${os.platform()}.zip` }],

    //html report way 2: losing html structure here

    ['html', {
      outputFolder: 'reports/html',
      open: 'never',
      // host: '0.0.0.0',
      // port: 9223
    }],


    ['json', { outputFile: 'reports/json/json-report.json' }],
    ['junit', { outputFile: 'reports/junit/junit-report.xml' }],

    //allure report
    ['allure-playwright'],

  ],

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
