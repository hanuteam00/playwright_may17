import { expect, test } from "@playwright/test";

test("TC1: Interact with frames - Frame locator", async ({ page }) => {

    await page.goto("https://letcode.in/frame");
    
    const allframes = page.frames();
    console.log("No.of frames: " + allframes.length);

    //frame locator to retrieve the iframe and locate elements within it
    const frame = page.frameLocator("#firstFr")
    await frame.locator("input[name='fname']").fill("Koushik");
    await frame.locator("input[name='lname']").fill("Chatterjee");

    const innerFrame = frame.frameLocator("iframe[src='innerFrame']")
    await innerFrame.locator("input[name='email']").fill("koushik@gmail.com")

    await frame.locator("input[name='fname']").fill("letcode");

    await page.waitForTimeout(3000);

})

test.only("TC2: Interact with frames - Frame Objects", async ({ page }) => {

    await page.goto("https://letcode.in/frame");
    
    const allframes = page.frames();
    console.log("No.of frames: " + allframes.length);

    const myFrame = page.frame("firstFr")
    if (myFrame != null) {
        await myFrame.fill("", "")
    }
    await myFrame?.fill("input[name='fname']", "koushik")
    await myFrame?.fill("input[name='lname']", "chatterjee")

    expect(await myFrame?.locator("p.has-text-info").textContent()).toContain("You have entered")

    await page.waitForTimeout(3000);

})