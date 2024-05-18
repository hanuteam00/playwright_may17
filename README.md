## 0. Introduction - What is Playwright

Tutorial docs: https://github.com/ortoniKC/playwright-ts-lambdatest
Tutorial videos: https://www.youtube.com/playlist?list=PLZMWkkQEwOPlS6BSWWqaAIrSNf_Gw4MQ1
Github: https://github.com/ortoniKC/playwright-ts-lambdatest

## I. How To Setup Playwright Test Automation Framework | Playwright Tutorial🎭| Part I | LambdaTest

https://www.youtube.com/watch?v=06HIhFcpBDo&list=PLZMWkkQEwOPlS6BSWWqaAIrSNf_Gw4MQ1&index=3
https://www.lambdatest.com/learning-hub/how-to-install-playwright

npm init playwright@latest
Change to headless: false in playwright.config.ts
Inside that directory, you can run several commands:
npx playwright test
Runs the end-to-end tests.
npx playwright test --ui
Starts the interactive UI mode.
npx playwright test --project=chromium
Runs the tests only on Desktop Chrome.
npx playwright test example
Runs the tests in a specific file.
npx playwright test --debug
Runs the tests in debug mode.
npx playwright codegen
Auto generate tests with Codegen.
We suggest that you begin by typing:
npx playwright test

## II. Playwright Testing Features | Playwright With TypeScript Tutorial🎭| Part III | LambdaTest

https://www.lambdatest.com/learning-hub/playwright-futuristic-features
https://www.youtube.com/watch?v=1INdYpaXqLE&list=PLZMWkkQEwOPlS6BSWWqaAIrSNf_Gw4MQ1&index=5

//get by placeholder
await page.getByPlaceholder('Enter your email').fill('manh+edu1@gotitapp.co');
await page.getByPlaceholder('Enter your email').press('Tab');
//get by locator
await page.locator(`input[placeholder='Enter your password']`).fill('Aa123456@');
//click by css selector
// await page.getByRole('button', { name: 'Log In' }).first().click();
//click by text
await page.click("'Log in'");
await expect(page.getByRole('main')).toContainText('Manage your courses and students, all in one place!');

newContext() = not shared cookie
const newContext = await browser.newContext();
const newPage = await newContext.newPage();
await newPage.goto("/home");
await page.waitForTimeout(15000);

### 1. Playwright Test Generator and Test Inspector

–npx playwright codegen

### 2. Playwright Fixtures

- we don’t need to launch a Chromium browser; instead, we place a code that indicates ‘’page. goto along with the URL.’’
- In short, we can say that there is the usage of only parameters under the Playwright test runner, and this concept is known as the Playwright fixture.
- under the test file folder, we are using the fixture page, we open the browser and, in the end, close the browser.
- browser's opening and closing happen alone, and we do not have to make manual changes

### 3. Screenshots And Videos On Test Failures

use: {
//work - but not show correct screenshot name
screenshot: 'on',
///work - but not show correct video name
video: {
mode: 'on',
// mode:'retain-on-failure',//prefer this to reduce report size
size: { width: 1920, height: 1080 },
}
}

### 4. Playwright Retries

retries: 2,

### 5. Playwright Auto-Waiting Mechanism

https://playwright.dev/docs/actionability

## III. Playwright Component Testing: How To Get Started

https://www.lambdatest.com/learning-hub/playwright-component-testing

1. Installing React
   sudo npx create-react-app myappname (no capital letters)
2. Project Structure
3. Start the app
   cd component-app
   sudo npm start
   back to terminal of the componennt-app
4. Installing Playwright Components Module
   sudo npm init playwright@latest -- --ct
   ✔ Success! Created a Playwright Test project at /Users/manhkaka
   Downloads/automation-tut/component-app
   Inside that directory, you can run several commands:
   npm run test-ct
   Runs the component tests.
   npm run test-ct -- --project=chromium
   Runs the tests only on Desktop Chrome.
   npm run test-ct App.test.ts
   Runs the tests in the specific file.
   npm run test-ct -- --debug
   Runs the tests in debug mode.
   We suggest that you begin by typing:
   npm run test-ct
   Visit https://playwright.dev/docs/intro for more information. ✨
   Happy hacking! 🎭

5. Playwright Component Structure
   playwright: A new folder has been created; it contains two files.
   index.html: This file will be used by Playwright to mount your component, and it will do it in the same way as React > Public > index.html by using the “root” element.
   index.ts: This file is for you to include themes, styles, or even apply code for the page where your component will be mounted.
   playwright-ct.config.ts: The playwright configuration file where you can set up your browser, timeouts, etc.
6. Creating the Test File
   create a tests folder inside src folder
   create components.spec.tsx
7. Writing the Test
   7.1 Allowing JSX
   //allowing us to write HTML in React
   create a tsconfig.json file
   {
   "compilerOptions": {
   "jsx": "react-jsx",
   "target": "ESNext",
   "module": "commonjs",
   "moduleResolution": "Node",
   "sourceMap": true,
   "outDir": "../tests-out"
   }
   }
8. Understanding the Test
   “mount” basically allows us to put the component into the DOM to render it

9. Running the Test
   npm run test-ct
   Note:

- App.test.js file might not work
- You can change test dir: testDir: './src/tests', in playwright-ct.config.ts

10. Adding more Components to App

- create header.js in src with below code
  function Header () {
  return (
  <header>
  <h1>Header Testing Component</h1>
  </header>
  )
  }
  export default Header
- in App.js, update
  import Header from './header'
  function App() {
  return (
  <div className="App">
  <Header/>
  <header className="App-header">
  {/_ add an attribute called “qa-id” to the header component _/}
  <h1 qa-id="header-component">Header Text in Testing Component</h1>

11. Updating the Test
    in components.spec.tsx
    test('should work', async ({ mount, page }) => {
    const component = await mount(<App></App>);
    await expect(component).toContainText('Learn React');
    await expect(page.locator("[qa-id='header-component']")).toHaveText("Header Text in Testing Component")
      <!-- page.close() -->

    await page.waitForTimeout(5000);
    });

12. Testing Header Component in Isolation

- in App.js
  import Header from '../../src/header';
  // import App from '../../src/App'
  import { test, expect } from '@playwright/experimental-ct-react';
  import Header from '../../src/header';
  test.use({ viewport: { width: 500, height: 500 } });

test('should work', async ({ mount, page }) => {
const component = await mount(<Header></Header>);
await expect(page.locator("[qa-id='Header']")).toHaveText("Header Testing Component")
page.close()
});

13. Visual Testing of Components

- step 1: add below code
  await expect(page.locator("header>h1")).toHaveScreenshot()
- step 2: run 2 times "npm run test-ct"
  //first run to take screenshot
  //second run to compare screenshot for visual testing

14. Other notes
    //Keep in mind the script in the package.json file will also need to be added for you to execute the tests.
    "test-ct": "playwright test -c playwright-ct.config.ts"

Screenshot section
https://playwright.dev/docs/screenshots

## IV. How To Handle Inputs and Buttons In Playwright

https://www.lambdatest.com/learning-hub/handling-inputs-and-buttons-in-playwright
https://www.youtube.com/watch?v=GJtI_KWzPIo

textContent is a function that will return the text present in particular elements
console.log(await page.locator("#addmessage").textContent());

## V. How To Use Functions And Selectors | Playwright With TypeScript Tutorial 🎭| Part II | LambdaTest

https://www.lambdatest.com/learning-hub/functions-and-selectors-in-playwright
https://www.youtube.com/watch?v=UWeXnulWfJs&list=PLZMWkkQEwOPlS6BSWWqaAIrSNf_Gw4MQ1&index=4

## VI. Playwright Tutorial: How to Handle Alerts and Dropdowns

https://www.lambdatest.com/learning-hub/handling-alerts-and-dropdowns-in-playwright
https://www.youtube.com/watch?v=k1m9sm8QMAM

launchOptions: {
//slowMo literally slows down browser interactions.
slowMo: 500,
},

## VII. Playwright Tutorial: Handling Frames and Windows
https://www.lambdatest.com/learning-hub/handling-frames-and-windows-in-playwright
https://www.youtube.com/watch?v=JN16nilL8Wg

Timeouts settings
https://playwright.dev/docs/test-timeouts