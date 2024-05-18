import { expect, test } from "@playwright/test";

// This test is for handling alerts
test("TC1: Handling simple alerts - click OK", async ({ page }) => {
    // Navigate to the specified URL
    await page.goto("https://www.lambdatest.com/selenium-playground/javascript-alert-box-demo");
    page.on("dialog", async (alert) => {
        const text = alert.message();
        console.log(text);
        await alert.accept();
    })
    await page.locator("button:has-text('Click Me')").nth(0).click();
    await page.waitForTimeout(5000);
})


test("TC2a: Handling confirmation alerts - dismiss", async ({ page }) => {
    // Navigate to the specified URL
    await page.goto("https://www.lambdatest.com/selenium-playground/javascript-alert-box-demo");
    //activate the “event listener” so it will get active when you click on the button. It's quite the reverse process
    // Listen for the dialog event (which is triggered when an alert pops up)
    page.on("dialog", async (alert) => {
        const text = alert.message();
        console.log(text);;
        await alert.dismiss();
    })
    await page.locator("button:has-text('Click Me')").nth(1).click();
    expect(page.locator("id=confirm-demo")).toContainText("Cancel!")
    await page.waitForTimeout(5000);
})

test("TC2b: Handling confirmation alerts - accept", async ({ page }) => {
    // Navigate to the specified URL
    await page.goto("https://www.lambdatest.com/selenium-playground/javascript-alert-box-demo");
    //activate the “event listener” so it will get active when you click on the button. It's quite the reverse process
    // Listen for the dialog event (which is triggered when an alert pops up)
    page.on("dialog", async (alert) => {
        const text = alert.message();
        console.log(text);;
        await alert.accept();
    })
    await page.locator("button:has-text('Click Me')").nth(1).click();
    expect(page.locator("id=confirm-demo")).toContainText("OK!")
    await page.waitForTimeout(5000);
})

test("TC3: Handling prompt alerts - input text and click OK", async ({ page }) => {
    // Navigate to the specified URL
    await page.goto("https://www.lambdatest.com/selenium-playground/javascript-alert-box-demo");
    //activate the “event listener” so it will get active when you click on the button. It's quite the reverse process
    // Listen for the dialog event (which is triggered when an alert pops up)
    page.on("dialog", async (alert) => {
        // Get the default text of the alert
        const text = alert.message();
        const text1 = alert.defaultValue();
        console.log("alert.message(): ", text);
        console.log("alert.defaultValue(): ", text1);
        // Accept the alert and send "koushik" as the response
        //It will require “await” functions for accepting because you have to handle the promises here
        await alert.accept("koushik");
    })
    // Click the third button that has the text 'Click Me'
    await page.locator("button:has-text('Click Me')").nth(2).click();
    // Check if the element with id 'prompt-demo' contains the text "'koushik'"
    expect(page.locator("id=prompt-demo")).toContainText("'koushik'");
    await page.waitForTimeout(5000);
})

// This test is for handling modal alerts
test("TC4: Handling Modal alert - alert in DOM", async ({ page }) => {
    // Navigate to the specified URL
    await page.goto("https://www.lambdatest.com/selenium-playground/bootstrap-modal-demo")
    // Click the button that triggers the modal
    await page.click("//button[@data-target='#myModal']")
    // Click the 'Save Changes' button in the modal
    await page.click("(//button[text()='Save Changes'])[1]")
})