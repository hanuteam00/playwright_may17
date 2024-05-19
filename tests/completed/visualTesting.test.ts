// example.spec.js
const { test, expect } = require('@playwright/test');

test('example test', async ({ page }) => {
  await page.goto('https://ecommerce-playground.lambdatest.io/');
  await expect(page).toHaveScreenshot();
});
