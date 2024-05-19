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

## VIII. How to Handle iFrames in Playwright

https://www.lambdatest.com/learning-hub/handling-iframes-in-playwright
https://www.youtube.com/watch?v=JN16nilL8Wg

## IX. Playwright Assertions : Complete Guide With Examples

https://www.lambdatest.com/learning-hub/playwright-assertions
https://github.com/codewithmmak/playwright-assertions-demo

- expect
- Negative Matchers
  eg: await expect(page.getByText('Top Category'), 'top category text should not be visible').not.toBeVisible();
- Soft Assertions and Hard Assertions
  eg: Soft Assertions just verifying some condition, and it doesn’t interrupt the whole execution if the condition is not satisfied but marks the test as failed
  const { test } = require("../lambdatest-setup");
  const { expect } = require("@playwright/test");
  test('Soft assertion test', async ({ page }) => {
  await page.goto('https://ecommerce-playground.lambdatest.io');
  //soft
  await expect.soft(page.getByText('Top Category'), 'top category should be visible').toBeVisible();
  //hard
  await expect(page).toHaveTitle("Your Store");
  });
- Default intervals are [100, 250, 500, 1000].
  test('Custom Polling test', async ({ page }) => {
  await expect.poll(async () => {
  const response = await page.request.get('https://api.lambdatest.com/automation/api/v1/platforms');
  return response.status();
  }, {
  message: 'Response was either not 200 or timeout',
  intervals: [2_000, 4_000, 10_000],
  timeout: 20000,
  }).toBe(201);//201 to mimic failure, status should be 200
  });

## 13. Playwright Page Object Model: A Definitive Guide
https://www.lambdatest.com/learning-hub/playwright-page-object-model
https://github.com/qa-gary-parker/playwright-testing-pom

The ‘tests’ folder contains all of our spec files
The ‘pages’ folder contains the corresponding page files in line with our spec files
You will also notice we have a ‘base.page.js’; this is optional and can be used to store any global actions which are not isolated to a single component or page
Outside this folder structure, we have the usual package, config, and module files
We may want to add ‘utilities’, ‘config’ or additional ‘helper’ folders as the project grows, but this is all we need as a starting point

### 12.1. Page class design structures
1. option 1
//registerPage.ts
import { Page, Locator } from "@playwright/test";
export default class RegisterPage {
    constructor(public page: Page) { }
    get firstNameInput(): Locator { 
      return this.page.locator("#input-firstname"); 
   }
}
//testcase.test.ts
import { test, expect } from './your_test_config_file'; // replace with your test config file
import RegisterPage from './registerPage';

let registerPage: RegisterPage;

test.beforeEach(async ({ page }) => {
   registerPage = new RegisterPage(page);
});

test('register test', async ({ page }) => {
   await registerPage.firstNameInput.type('John');
});

2. option 2
//registerPage.ts
import { Page } from "@playwright/test";
export default class RegisterPage {
    constructor(public page: Page) { }

    async enterFirstName(firstname: string) {
        await this.page.locator("#input-firstname")
            .type(firstname);
    }
});

//testcase.test.ts
test.describe("Page object test demo", async () => {
    let register: any;

    test.beforeEach(async ({ page }) => {
        register = new RegisterPage(page);
    });

    test("TC1: Register test_01", async ({ page, baseURL }, testInfo) => {
        await page.goto(`${baseURL}route=account/register`);
        await register.enterFirstName(firstName);
});
});
### 12.2. Test case design structures
1. option 1
test.describe("Page object test demo", async () => {
   let register: any;
   test.beforeEach(async ({ page }) => {
      register = new RegisterPage(page);
   });
   test("Register test_01", async ({ page, baseURL }, testInfo) => {
      await page.goto(`${baseURL}route=account/register`);
   });
});
Ưu điểm:
RegisterPage được khởi tạo mới trước mỗi test case, giúp đảm bảo rằng không có trạng thái nào được chia sẻ giữa các test case. Điều này giúp các test case của bạn độc lập hơn.
Nếu bạn cần sử dụng RegisterPage trong nhiều test case, việc khởi tạo nó một lần trong beforeEach sẽ giúp giảm bớt lượng mã lặp lại.
Nhược điểm:
Nếu chỉ có một số ít test case cần sử dụng RegisterPage, việc khởi tạo nó trước mỗi test case có thể là không cần thiết và làm chậm quá trình thực hiện test.
2. option 2
test.describe("Page object test demo", async () => {
   test("Register test_01", async ({ page, baseURL }, testInfo) => {
   //việc khởi tạo RegisterPage trong mỗi test case cũng giúp đảm bảo rằng không có trạng thái nào được chia sẻ giữa các test case, giúp các test case của bạn độc lập hơn
   const register = new RegisterPage(page);
   });
});
Ưu điểm:
Bạn có thể kiểm soát chính xác khi nào RegisterPage được khởi tạo, và nó chỉ được khởi tạo cho những test case cần thiết.
Điều này cũng giúp đảm bảo rằng không có trạng thái nào được chia sẻ giữa các test case.
Nhược điểm:
Nếu RegisterPage cần được sử dụng trong nhiều test case, việc khởi tạo nó trong mỗi test case có thể dẫn đến việc lặp lại mã.

3. Sử dụng Fixture trong base/pomFixture.ts
ví dụ: Trong ví dụ này, chúng tôi đã tạo hai fixture loginPage và homePage để tạo các đối tượng trang cụ thể. Sau đó, chúng tôi sử dụng các fixture này trong các bài kiểm tra để thực hiện các hành động trên các trang cụ thể.
import { test as baseTest } from '@playwright/test';
import LoginPage from '../pages/loginPage';
import HomePage from '../pages/homePage';

// Định nghĩa fixture
const test = baseTest.extend({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await use(homePage);
  },
});

// Sử dụng fixture trong bài kiểm tra
test('Login test', async ({ page, loginPage }) => {
  await loginPage.login('user@example.com', 'password');
  // ...
});

test('Home page test', async ({ page, homePage }) => {
  await homePage.clickOnSpecialHotMenu();
  // ...
});

## 14. Playwright Visual Regression Testing
https://github.com/LambdaTest/playwright-sample

// example.spec.js
const { test, expect } = require('@playwright/test');

test('example test', async ({ page }) => {
  await page.goto('https://ecommerce-playground.lambdatest.io/');
  await expect(page).toHaveScreenshot();
});

Run above code 1st time to get screenshot
Run above code 2nd time to get passed
Run above code 3rd time + expand screen to get failed test-results

Serving HTML report at http://localhost:9323. Press Ctrl+C to quit.
Error: Screenshot comparison failed:

  947 pixels (ratio 0.01 of all image pixels) are different.

Expected: /Users/manhkaka/Downloads/automation-tut/playwright_may17/tests/inprogress/visualTesting.test.ts-snapshots/example-test-1-firefox-darwin.png
Received: /Users/manhkaka/Downloads/automation-tut/playwright_may17/test-results/visualTesting-example-test-firefox/example-test-1-actual.png
Diff: /Users/manhkaka/Downloads/automation-tut/playwright_may17/test-results/visualTesting-example-test-firefox/example-test-1-diff.png

### 14.2. Implementing visual testing for a single element
Before we perform Playwright visual regression testing, we will need to update our baseline images. We can do that by running this simple command:
npx playwright test --update-snapshots

### 14.3. Working with Thresholds
With Playwright visual regression testing, as with any type of automation testing, there will always be a margin for error. This is where thresholds come in useful. We can adjust and manage various threshold types depending on our application and use case.

Here are three examples below:

- maxDiffPixelRatio - this value can be between 0 and 1 and is defined as the acceptable amount of pixels that can differ from the total amount of pixels.
- maxDiffPixels - this can be any value and is just a count of how many pixels can be different - it's worth experimenting with your test execution and seeing what an acceptable difference is.
- Threshold - this value can be between 0 (strict) and 1 (lax) and is the acceptable perceived color difference between the same pixel in the compared images - again, this is worth experimenting with and seeing how strict you want it to be.

This can be applied globally to all tests or just to a specific project.

module.exports = {
expect: {
toHaveScreenshot: { maxDiffPixels: 100 },
},
};

### 14.4. Ignoring sections of the webpage during comparison
- use an option called ‘mask,’ which allows us to ignore a locator or group of locators from our comparison
npx playwright test --update-snapshots
// example.spec.js
const { test, expect } = require('@playwright/test');


test('example test', async ({ page }) => {
await page.goto('https://ecommerce-playground.lambdatest.io/');
await expect(page).toHaveScreenshot({mask: [page.locator('.carousel-inner')]})
});

### 14.5. Implementing full page visual comparisons
- this will capture the full height of the webpage. This can be useful if your website has a lot of scrollable components or content you need to verify.
- we capture a larger area, the chance of failure may be higher. We can reduce this risk by using a few additional parameters.
   + animations: “disabled” - this will stop any CSS animations or transitions on your webpage.
   + maxDiffPixelRatio: 0.2 - which we covered earlier, will allow some room for minor differences.
// example.spec.js
const { test, expect } = require('@playwright/test');
test('example test', async ({ page }) => {
await page.goto('https://ecommerce-playground.lambdatest.io/');
await expect(page).toHaveScreenshot
({ fullPage: true, animations: "disabled", maxDiffPixelRatio: 0.2 });
});

Playwright Cucumber JS
https://github.com/LambdaTest/playwright-sample

npm run test-cucumber-js cucumber-js /Users/manhkaka/Downloads/automation-tut/playwright_may17/tests/cucumber/features/test.feature
-> does not work

## Playwright CLI (command line)
https://playwright.dev/docs/test-cli
Run all the tests
npx playwright test
Run a single test file
npx playwright test tests/todo-page.spec.ts
Run a set of test files
npx playwright test tests/todo-page/ tests/landing-page/
Run files that have my-spec or my-spec-2 in the file name
npx playwright test my-spec my-spec-2
Run tests that are in line 42 in my-spec.ts
npx playwright test my-spec.ts:42
Run the test with the title
npx playwright test -g "add a todo item"
Run tests in headed browsers
npx playwright test --headed
Run all the tests against a specific project
npx playwright test --project=chromium
Disable parallelization
npx playwright test --workers=1
Choose a reporter
npx playwright test --reporter=dot
Run in debug mode with Playwright Inspector
npx playwright test --debug
Run tests in interactive UI mode, with a built-in watch mode (Preview)
npx playwright test --ui
Ask for help
npx playwright test --help