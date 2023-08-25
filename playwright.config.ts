import type { PlaywrightTestConfig } from '@playwright/test';
import { devices } from '@playwright/test';

import dotenv from 'dotenv';


dotenv.config();


/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
const config: PlaywrightTestConfig = {
  testDir: './tests',
  /* Maximum time one test can run for. */
  timeout: 2 * 60 * 1000,
  globalTimeout: 60*60*1000,
  expect: {
    /**
     * Maximum time expect() should wait for the condition to be met.
     * For example in `await expect(locator).toHaveText();`
     */
    timeout: 30000
  },
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 0 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : 1,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  //globalSetup: require.resolve('./global-setup'),
  //globalTeardown: require.resolve('./global-teardown'),
  use: {
    /* Maximum time each action such as `click()` can take. Defaults to 0 (no limit). */
    actionTimeout: 10000,
    
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: process.env.BASE_URL,

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',

    //storageState: './storageStates/twocentsLogin.json',
    //set to false to disable visual testing
    headless: process.env.HEADLESS === "true",
    screenshot: 'only-on-failure',
    video: 'off',

    launchOptions: {
      //slowMo: 1000,
    }
  },

  /* Configure projects for major browsers */
  projects: [

    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
        viewport: {width: 1920, height: 1080},
        //viewport: {width: 1280, height: 700},
      },
    },
  

    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        viewport: {width: 1920, height: 1080},
        permissions: ["clipboard-read", "clipboard-write"],
      },
    },
    

    {
      name: 'webkit',
      use: {
        ...devices['Desktop Safari'],
        viewport: {width: 1920, height: 1080},
        //viewport: {width: 1280, height: 700},
      },
    },

/*
     {
       name: 'Mobile Chrome',
       use: {
         ...devices['Pixel 5'],
         //viewport: {width: 393, height: 727},
       },
     },
*/
     /*
     {
       name: 'Mobile Safari',
       use: {
         ...devices['iPhone 12'],
       },
     },
*/
  ],

  /* Folder for test artifacts such as screenshots, videos, traces, etc. */
  // outputDir: 'test-results/',

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   port: 3000,
  // },
};

export default config;
