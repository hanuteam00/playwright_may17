let facebookPage: Page; // Khai báo biến facebookPage kiểu Page

import { expect, Page, test } from "@playwright/test"; // Import các module từ thư viện Playwright Test

test("TC1: Interact with single tab, single window popup", async ({ page }) => {
    await page.goto("https://www.lambdatest.com/selenium-playground/window-popup-modal-demo");
    console.log(page.url());
    const [newWindow] = await Promise.all([
        page.waitForEvent("popup"),
        page.click("'Follow On Twitter'")
    ]);

    console.log(newWindow.url());

    // console.log(newWindow.url());
    // newWindow.fill("", "")
    // await newWindow.fill("#username", "myUsername");

    // Click on the Login button on the new window
    await newWindow.click("//span[contains(text(),'Log in')]");
    await page.waitForTimeout(3000);
})

test.only("Interact with multiple tabs, multiple window popups", async ({ page }) => {
    await page.goto("https://www.lambdatest.com/selenium-playground/window-popup-modal-demo"); // Điều hướng trình duyệt đến URL chỉ định

    const [multiPage] = await Promise.all([ // Sử dụng Promise.all để đợi cho cả hai hành động sau hoàn thành
        page.waitForEvent("popup"), // Đợi cho đến khi một popup xuất hiện
        page.click("#followboth") // Click vào element có id là "followboth"
    ])
    await multiPage.waitForLoadState(); // Đợi cho đến khi trang web hoàn toàn tải xong

    const pages = multiPage.context().pages(); // Lấy danh sách tất cả các trang (tabs) hiện tại
    console.log('No.of tabs: ' + pages.length); // In ra số lượng tabs

    pages.forEach(tab => { // Duyệt qua từng tab
        console.log(tab.url()); // In ra URL của tab
    })

    for (let index = 0; index < pages.length; index++) { // Duyệt qua từng tab
        const url = pages[index].url() // Lấy URL của tab
        if (url == "https://www.facebook.com/lambdatest/") { // Nếu URL của tab là URL của Facebook LambdaTest
            facebookPage = pages[index]; // Gán tab đó cho biến facebookPage
        }
    }
    const text = await facebookPage.textContent("//h1") // Lấy nội dung text của thẻ h1 trên trang Facebook LambdaTest
    console.log(text); // In ra nội dung đó

})