import { Given, When, Then } from "@cucumber/cucumber";
import { Page, Browser, chromium } from "@playwright/test";

let page: Page;
let browser: Browser;

Given("Open DuckDuckGo Website", async function() {
  browser = await chromium.launch();
  page = await browser.newPage();
  await page.goto("https://duckduckgo.com");
});

// When("I search for {string}", async function(keyword: string) {
//   await page.fill("#search_form_input_homepage", keyword);
//   await page.press("#search_form_input_homepage", "Enter");
// });

// When("I search for {string}", { timeout: 10000 }, async function(keyword: string) {
//   await page.fill("#search_form_input_homepage", keyword);
//   await page.press("#search_form_input_homepage", "Enter");
// });

When("I search for {string}", { timeout: 20000 }, async function(keyword: string) {
  await page.fill("#search_form_input_homepage", keyword);
  await Promise.all([
    page.press("#search_form_input_homepage", "Enter"),
    page.waitForNavigation()
  ]);
});

Then("I should see results related to {string}", async function(keyword: string) {
  await page.waitForSelector(`text=${keyword}`);
  await browser.close();
});