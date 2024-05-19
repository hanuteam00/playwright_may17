import { Page } from "@playwright/test";

// Định nghĩa class HomePage
export default class HomePage {
    // Khởi tạo class với một đối tượng Page từ Playwright
    constructor(public page: Page) { }

    // Phương thức clickOnSpecialHotMenu
    async clickOnSpecialHotMenu() {
        // Sử dụng Promise.all để đảm bảo cả hai hành động sau đây hoàn thành trước khi tiếp tục
        // 1. Chờ cho đến khi không còn yêu cầu mạng nào (waitForNavigation)
        // 2. Nhấp vào một phần tử cụ thể trên trang (click)
        await Promise.all([
            this.page.waitForNavigation({ waitUntil: "networkidle" }),
            this.page.click("(//span[contains(text(),'Special')]/../..)[2]")
        ])


        /* Start waiting for navigation before clicking. Note no await.
        const navigationPromise = this.page.waitForURL("(//span[contains(text(),'Special')]/../..)[2]");
        await this.page.click("(//span[contains(text(),'Special')]/../..)[2]");
        await navigationPromise;
        */
    }
}