import config from '../base/configTypes';
import { chromium, test, expect } from "@playwright/test";

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
    await page.hover(`h3[class^='TitleStyled-']`);
    await page.waitForTimeout(5000);
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