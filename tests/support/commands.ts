import { Page } from "@playwright/test";

export async function selectCountry(page: Page, countryName: any) {
    await page.click("#country+span");
    await page.locator("ul#select2-country-results")
        .locator("li", {
            hasText: countryName
        }).click();
    await page.waitForTimeout(3000);
}

