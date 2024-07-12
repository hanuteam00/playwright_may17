import config from '../base/configTypes';
import { chromium, test, expect } from "@playwright/test";
import singleTestedEducator from '../../fixtures/educator/singleTestedEducator.json';
import multipleTestedEducator from '../../fixtures/educator/multipleTestedEducator.json';


// console.log(config.DEV_URL);
// console.log(config.HOTFIX_URL);
// console.log(config.EXP_URL);
// console.log(config.POC_URL);
// console.log(config.PRODUCTION_URL);
// console.log(config.BASE_URL);

test("Login test demo", async ({ page }) => {
    //go to login page
    // await page.goto("/login?role=educator");
    await page.goto(`${config.BASE_URL}/login?role=educator`);
    await page.getByPlaceholder('Enter your email').fill('manh+edu1@gotitapp.co');
    await page.getByPlaceholder('Enter your email').press('Tab');
    await page.locator(`input[placeholder='Enter your password']`).fill('Aa123456@');
    //click by css selector
    // await page.getByRole('button', { name: 'Log In' }).first().click();
    //click by text
    await page.click("'Log in'");
    await expect(page.getByRole('main')).toContainText('Manage your courses and students, all in one place!');

    await page.waitForTimeout(3000);

});

test('TC1a - login successfully using read file - single data', async ({ page }) => {
    await page.goto(`${config.BASE_URL}/login?role=educator`);
    await page.getByPlaceholder('Enter your email').fill(singleTestedEducator.email);
    await page.getByPlaceholder('Enter your email').press('Tab');
    await page.locator(`input[placeholder='Enter your password']`).fill(singleTestedEducator.password);
    await page.click("'Log in'");
    await expect(page.getByRole('main')).toContainText('Manage your courses and students, all in one place!');

    await page.evaluate(() => localStorage.clear());

});

test('TC1b - login successfully using read file - multiple data', async ({ page }) => {
    console.log(multipleTestedEducator);

    for (let data of multipleTestedEducator) {
        await page.goto(`${config.BASE_URL}/login?role=educator`);
        await page.getByPlaceholder('Enter your email').fill(data.email);
        await page.getByPlaceholder('Enter your email').press('Tab');
        await page.locator(`input[placeholder='Enter your password']`).fill(data.password);
        await page.click("'Log in'");
        await expect(page.getByRole('main')).toContainText('Manage your courses and students, all in one place!');
        await page.evaluate(() => localStorage.clear());
    };
});