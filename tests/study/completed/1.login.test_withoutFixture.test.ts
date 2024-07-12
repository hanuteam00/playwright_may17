import { chromium, test, expect } from "@playwright/test";


test("Login test demo", async ({ }) => {

    //launch browser
    const browser = await chromium.launch({ headless: false });
    
    //create a new context
    //do not share cookies/cache with other contexts
    const context = await browser.newContext();
    
    //create a new page
    //similar to new tab
    const page = await context.newPage();

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

    await page.waitForTimeout(5000);

    const newContext = await browser.newContext();
    const newPage = await newContext.newPage();
    await newPage.goto("/home");
    await page.waitForTimeout(15000);

    // await page.waitForTimeout(5000);
    // await page.goto("/home");
});