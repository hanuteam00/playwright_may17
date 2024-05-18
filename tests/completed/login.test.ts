import { chromium, test, expect } from "@playwright/test";


test("Login test demo", async ({ page}) => {

    //go to login page
    await page.goto("/login?role=educator");
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