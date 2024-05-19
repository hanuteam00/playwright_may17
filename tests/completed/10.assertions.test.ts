import { test, expect } from "@playwright/test";

//if a test fails, you want to show a custom error message, you can use custom expect message
test('Custom expect message test', async ({ page }) => {
    await page.goto('https://ecommerce-playground.lambdatest.io');
    await expect(page.getByText('Top Category'), 'top category should be visible').toBeVisible();
});
//specify the custom polling intervals. 
//Probe, wait 2 seconds, probe, wait 4 seconds, probe, wait 10 seconds, probe, wait 10 seconds. 
//Default intervals are [100, 250, 500, 1000].
test.only('Custom Polling test', async ({ page }) => {
    await expect.poll(async () => {
        const response = await page.request.get('https://api.lambdatest.com/automation/api/v1/platforms');
        return response.status();
    }, {
        message: 'Response was either not 200 or timeout',
        intervals: [2_000, 4_000, 10_000],
        timeout: 20000,
    }).toBe(201);//201 to mimic failure, status should be 200
});

//If the expected condition doesn’t match then it is going to retry till its timeout (default ~ 30000ms).
test('Custom Retry test', async ({ page }) => {
    await expect(async () => {
        const response = await page.request.get('https://api.lambdatest.com/automation/api/v1/platforms');
        expect(response.status()).toBe(201);//201 to mimic failure, status should be 200
    }).toPass({
        intervals: [1_000, 2_000, 10_000],
        timeout: 20_000
    });
});

//Soft Assertions just verifying some condition, 
//and it doesn’t interrupt the whole execution 
//if the condition is not satisfied but marks the test as failed
test('Soft assertion test', async ({ page }) => {
    await page.goto('https://ecommerce-playground.lambdatest.io');
    //soft
    await expect.soft(page.getByText('Top Category'), 'top category should be visible').toBeVisible();
    //hard
    await expect(page).toHaveTitle("Your Store");
    console.log('Title is: ' + await page.title());
});

test('Negative matchers test', async ({ page }) => {
    await page.goto('https://ecommerce-playground.lambdatest.io');
    await expect(page.getByText('Top Category'), 'top category text should not be visible').not.toBeVisible();
});