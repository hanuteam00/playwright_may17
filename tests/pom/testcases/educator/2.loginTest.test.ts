import { test, expect } from '@playwright/test';
import LoginPageUI from '../../pageUI/educatorPages/LoginPageUI'
import HomePageUI from '../../pageUI/educatorPages/HomePageUI'
import singleTestedEducator from '../../../fixtures/educator/singleTestedEducator.json';
import multipleTestedEducator from '../../../fixtures/educator/multipleTestedEducator.json';

let loginPage: any, homePage: any;

test.describe.only('Test Suite 1 - Successful Login', () => {

  test.beforeEach(async ({ page, baseURL }) => {
    loginPage = new LoginPageUI(page);
    homePage = new HomePageUI(page);
    await page.goto('/login?role=educator');
  });

  test('TC1a - login successfully using read file - single data', async ({ page }) => {
    await loginPage.emailInput.fill(singleTestedEducator.email);
    await loginPage.passwordInput.fill(singleTestedEducator.password);
    await loginPage.loginButton.click();
    expect(await homePage.greetingHeading.textContent()).toContain('Welcome');
    expect(await homePage.instructorSummary.textContent()).toContain('Manage your courses and students, all in one place!');
    // await page.evaluate(() => window.sessionStorage.clear());
    await page.evaluate(() => localStorage.clear());
    // await page.goto('/login?role=educator');
    // await page.waitForTimeout(3000);
  });

  test('TC1b - login successfully using read file - multiple data', async ({ page }) => {
    console.log(multipleTestedEducator);

    for (let data of multipleTestedEducator) {
      await page.goto('/login?role=educator');
      await loginPage.emailInput.fill(data.email);
      await loginPage.passwordInput.fill(data.password);
      await loginPage.loginButton.click();
      expect(await homePage.greetingHeading.textContent()).toContain('Welcome');
      expect(await homePage.instructorSummary.textContent()).toContain('Manage your courses and students, all in one place!');
      await page.evaluate(() => localStorage.clear());
    }

    // for (let i = 0; i < multipleTestedEducator.length; i++) {
    //   await page.goto('/login?role=educator');
    //   if (!multipleTestedEducator[i]) continue;  // Skip undefined values
    //   await loginPage.emailInput.fill(multipleTestedEducator[i].email);
    //   await loginPage.passwordInput.fill(multipleTestedEducator[i].password);
    //   await loginPage.loginButton.click();
    //   expect(await homePage.greetingHeading.textContent()).toContain('Welcome');
    //   expect(await homePage.instructorSummary.textContent()).toContain('Manage your courses and students, all in one place!');
    //   await page.evaluate(() => localStorage.clear());
    // }
  });

  test('TC2 - login successfully with correct credentials', async ({ page }) => {
    await loginPage.emailInput.fill('engineer+edu1@gotitapp.co');
    await loginPage.passwordInput.fill('Aa123456@');
    await loginPage.loginButton.click();
    expect(await homePage.greetingHeading.textContent()).toContain('Welcome');
    expect(await homePage.instructorSummary.textContent()).toContain('Manage your courses and students, all in one place!');
    await page.evaluate(() => window.sessionStorage.clear());
  });
});

test.describe('Test Suite 2 - Failed Login', () => {

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPageUI(page);
    await page.goto('/login?role=educator');
  });

  test('TC3 - login unsuccessfully with incorrect username', async () => {
    await loginPage.emailInput.fill('ABC+edu1@gotitapp.co');
    await loginPage.passwordInput.fill('Aa123456@');
    await loginPage.loginButton.click();
    expect(await loginPage.messageContent.textContent()).toContain('Invalid email or password. Please try again!');
  });

  test('TC4 - login unsuccessfully with incorrect password', async () => {
    await loginPage.emailInput.fill('manh+edu1@gotitapp.co');
    await loginPage.passwordInput.fill('Aa123456@@@@@@');
    await loginPage.loginButton.click();
    expect(await loginPage.messageContent.textContent()).toContain('Invalid email or password. Please try again!');
  });
});