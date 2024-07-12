// example.spec.js
import { test, expect } from '@playwright/test';

test('single web page - full comparison', async ({ page }) => {
  await page.goto('https://ecommerce-playground.lambdatest.io/');
  //full comparison
  await expect(page).toHaveScreenshot({
    // maxDiffPixelRatio: 0.1,
    maxDiffPixels: 600,
    // threshold: 0.1 => hard to work
  })
});

test('single web page - thresholds', async ({ page }) => {
  await page.goto('https://ecommerce-playground.lambdatest.io/');
  //Working with Thresholds - margin for error
  await expect(page).toHaveScreenshot({
    // maxDiffPixelRatio: 0.1,
    maxDiffPixels: 200,
    // threshold: 0.1 => hard to work
  });
});

test('single element', async ({ page }) => {
  await page.goto('https://ecommerce-playground.lambdatest.io/');

  const headerLogo = page.locator('#entry_217821 > figure > a > img')
  await expect(headerLogo).toHaveScreenshot()
});

test('ignore section (dynamic content)', async ({ page }) => {
  await page.goto('https://ecommerce-playground.lambdatest.io/');
  await expect(page).toHaveScreenshot({ mask: [page.locator('.carousel-inner')] })
});


test('full long page', async ({ page }) => {
  await page.goto('https://ecommerce-playground.lambdatest.io/');
  //animations: “disabled” - this will stop any CSS animations or transitions on your webpage.
  //maxDiffPixelRatio: 0.2 - which we covered earlier, will allow some room for minor differences.
  await expect(page).toHaveScreenshot
    ({ fullPage: true, animations: "disabled", maxDiffPixelRatio: 0.2 });
});