import { test } from "@playwright/test";
import { selectCountry } from "../support/commands";

test("TC1: handling dropdown", async ({ page }) => {
    await page.goto("https://www.lambdatest.com/selenium-playground/select-dropdown-demo");
    await page.selectOption("#select-demo", {
        // label: "Tuesday"
        // value: "Friday"
        index: 5
    })
    // await page.waitForTimeout(3000);

    await page.selectOption("#multi-select", [
        {
            label: "Texas"
        }, {
            index: 2
        }, {
            value: "Washington"
        }
    ])
    // await page.waitForTimeout(3000);
})

test("TC2: Bootstrap dropdown", async ({ page }) => {
    await page.goto("https://www.lambdatest.com/selenium-playground/jquery-dropdown-search-demo");

    await selectCountry("India");
    await selectCountry("Denmark");
    await selectCountry("South Africa");
    // await page.waitForTimeout(3000);

    async function selectCountry(countryName: any) {
        await page.click("#country+span");
        await page.locator("ul#select2-country-results")
            .locator("li", {
                hasText: countryName
            }).click();
    }
    // await page.waitForTimeout(3000);
})

test("TC3: Bootstrap dropdown - using custom commands", async ({ page }) => {
    await page.goto("https://www.lambdatest.com/selenium-playground/jquery-dropdown-search-demo");

    // Use the function
    await selectCountry(page, "India");
    await selectCountry(page, "Denmark");
    await selectCountry(page, "South Africa");

})