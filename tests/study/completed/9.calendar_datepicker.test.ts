//@ts-check

import { test } from "@playwright/test";
import moment from "moment";

test("TC1: Calendar demo using fill function", async ({ page }) => {
    await page.goto("https://www.lambdatest.com/selenium-playground/bootstrap-date-picker-demo");
    let date = "1994-12-04"

    await page.fill("id=birthday", date);
    await page.waitForTimeout(3000)
})

test("TC2: Calendar demo using moment", async ({ page }) => {
    // Điều hướng đến trang web
    await page.goto("https://www.lambdatest.com/selenium-playground/bootstrap-date-picker-demo");

    // Chọn các ngày khác nhau
    await selectDate(12, "December 2023");
    await page.reload();
    await selectDate(5, "December 2024");
    await page.reload();
    await selectDate(2, "July 2025");
    await page.waitForTimeout(3000)

    async function selectDate(date: number, dateToSelect: string) {
        // Mở lịch bằng cách nhấp vào input
        await page.click("//input[@placeholder='Start date']")

        // Xác định các yếu tố cần thiết trên lịch
        const mmYY = page.locator("(//table[@class='table-condensed']//th[@class='datepicker-switch'])[1]");
        const prev = page.locator("(//table[@class='table-condensed']//th[@class='prev'])[1]");
        const next = page.locator("(//table[@class='table-condensed']//th[@class='next'])[1]");

        // Kiểm tra xem ngày cần chọn có phải là tháng này không
        const thisMonth = moment(dateToSelect, "MMMM YYYY").isBefore();

        // Chuyển đến tháng chứa ngày cần chọn
        while (await mmYY.textContent() != dateToSelect) {
            if (thisMonth) {
                await prev.click(); // Nếu ngày cần chọn là tháng trước, nhấp vào nút "prev"
            } else {
                await next.click(); // Nếu ngày cần chọn là tháng sau, nhấp vào nút "next"
            }
        }

        // Chọn ngày
        await page.click(`//td[@class='day'][text()='${date}']`);
    }
})