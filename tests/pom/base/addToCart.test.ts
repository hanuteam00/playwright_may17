// @ts-check
import { expect, test } from "@playwright/test";
import RegisterPage from "../pageUI_sample/registerPage"
import LoginPage from "../pageUI_sample/loginPage"
import HomePage from "../pageUI_sample/homePage"
import SpecialHotPage from "../pageUI_sample/specialHotPage"
import fs from 'fs';
import path from 'path';

//way 1 for POM
// Định nghĩa các thông tin cần thiết cho việc đăng ký và đăng nhập
const randTime = new Date().getTime();
const email = `${randTime}@mailinator.com`;
const password = "Koushik@123";
const firstName = "Koushik";
const lastName = "Chatterjee";
const phoneNumber = "1234567890";

test.describe("Page object test demo", async () => {
    let register: any;
    let login: any;
    let homePage: any;
    let special: any;

    test.beforeEach(async ({ page }) => {
        register = new RegisterPage(page);
        login = new LoginPage(page);
        homePage = new HomePage(page);
        special = new SpecialHotPage(page);
    });

    test("TC1: Register test_01", async ({ page, baseURL }, testInfo) => {
        // Điều hướng đến trang đăng ký
        await page.goto(`${baseURL}route=account/register`);

        // Use register here
        // Nhập thông tin đăng ký
        await register.enterFirstName(firstName);
        await register.enterLastName(lastName)
        await register.enterEmail(email);
        await register.enterTelephone(phoneNumber)
        await register.enterPassword(password);
        await register.enterConfirmPassword(password);

        // Kiểm tra xem checkbox đã được chọn chưa
        expect(register.isSubscribeChecked()).toBeChecked();

        // Nhấp vào các nút để hoàn tất đăng ký
        await register.clickTermandConditon();
        await register.clickContinueToRegister();

        console.log('STATUS: ' + testInfo.status);

        // Save account info to JSON file
        const accountInfo = {
            firstname: firstName,
            lastname: lastName,
            email: email,
            phone_number: phoneNumber,
            password: password,
        };

        const filePath = path.resolve(__dirname, '../test-data/successAccount.json');
        // Read existing data
        let existingData: any;
        try {
            existingData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        } catch (err) {
            existingData = [];
        }

        // Append new data
        existingData.push(accountInfo);

        // Write data back to file
        fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2));

        /* overwrite data in file
        const filePath = path.resolve(__dirname, './test-data/successAccount.json');
        fs.writeFileSync(filePath, JSON.stringify(accountInfo, null, 2));
        */
    });

    // Test case cho việc đăng nhập
    test("TC2: Login test_02", async ({ page, baseURL }) => {
        await page.goto(`${baseURL}route=account/login`)
        await login.enterEmail(email);
        await login.enterLoginPassword(password);
        await login.clickLoginBtn();

        // Kiểm tra xem tiêu đề trang có phải là "My Account" không
        expect(await page.title()).toBe("My Account");
    })

    // Test case cho việc thêm sản phẩm vào giỏ hàng
    test("TC3: Add to cart test_03", async ({ page, baseURL }) => {

        // Read account data from JSON file
        const filePath = path.resolve(__dirname, '../test-data/successAccount.json');
        const accountData = JSON.parse(fs.readFileSync(filePath, 'utf8'));

        // Get the last account in the array
        const lastAccount = accountData[accountData.length - 1];
        const { email, password } = lastAccount;

        await page.goto(`${baseURL}route=account/login`)
        await login.login(email, password);
        await homePage.clickOnSpecialHotMenu();
        // await special.addFirstProductToTheCart(); //no item now

        // Kiểm tra xem thông báo có hiển thị không
        // const isCartVisible = await special.isToastVisible();
        // expect(isCartVisible).toBeVisible();
    })
});

/* way 2 for POM
import { expect, test } from "@playwright/test";
import RegisterPage from "../pages/registerPage"
import LoginPage from "../pages/loginPage"
import HomePage from "../pages/homePage"
import SpecialHotPage from "../pages/specialHotPage"

// Định nghĩa các thông tin cần thiết cho việc đăng ký và đăng nhập
const email = "Koushik03@mailinator.com";
const password = "Koushik@123";

// Bắt đầu mô tả các test case
test.describe("Page object test demo", async () => {

    // Test case cho việc đăng ký
    test.only("Register test_01", async ({ page, baseURL }, testInfo) => {
        console.log('TITLE: ' + testInfo.title);

        // Khởi tạo trang đăng ký
        const register = new RegisterPage(page);

        // Điều hướng đến trang đăng ký
        await page.goto(`${baseURL}route=account/register`);

        // Nhập thông tin đăng ký
        await register.enterFirstName("Koushik");
        await register.enterLastName("Chatterjee")
        await register.enterEmail(email);
        await register.enterTelephone("1234567890")
        await register.enterPassword(password);
        await register.enterConfirmPassword(password);

        // Kiểm tra xem checkbox đã được chọn chưa
        expect(register.isSubscribeChecked()).toBeChecked();

        // Nhấp vào các nút để hoàn tất đăng ký
        await register.clickTermandConditon();
        await register.clickContinueToRegister();

        console.log('STATUS: ' + testInfo.status);
    })

    // Test case cho việc đăng nhập
    test("Login test_02", async ({ page, baseURL }) => {
        const login = new LoginPage(page);
        await page.goto(`${baseURL}route=account/login`)
        await login.enterEmail(email);
        await login.enterLoginPassword(password);
        await login.clickLoginBtn();

        // Kiểm tra xem tiêu đề trang có phải là "My Account" không
        expect(await page.title()).toBe("My Account");
    })

    // Test case cho việc thêm sản phẩm vào giỏ hàng
    test("Add to cart test_03", async ({ page, baseURL }) => {
        const login = new LoginPage(page);
        const homePage = new HomePage(page);
        const special = new SpecialHotPage(page);
        await page.goto(`${baseURL}route=account/login`)
        await login.login(email, password);
        await homePage.clickOnSpecialHotMenu();
        await special.addFirstProductToTheCart();

        // Kiểm tra xem thông báo có hiển thị không
        const isCartVisible = await special.isToastVisible();
        expect(isCartVisible).toBeVisible();
    })
})
*/

/*
import { expect, test } from "@playwright/test";
import RegisterPage from "../pages/registerPage"
import LoginPage from "../pages/loginPage"
import HomePage from "../pages/homePage"
import SpecialHotPage from "../pages/specialHotPage"

const email = "Koushik03@mailinator.com";
const password = "Koushik@123";
test.describe("Page object test demo", async () => {

    // const register = new RegisterPage(page);

    // test.use({
    //     baseURL:"somsomos"
    // })
    test.only("Register test_01", async ({ page, baseURL }, testInfo) => {
        console.log('TITLE: ' + testInfo.title);

        const register = new RegisterPage(page);
        await page.goto(`${baseURL}route=account/register`);
        await register.enterFirstName("Koushik");
        await register.enterLastName("Chatterjee")
        await register.enterEmail(email);
        await register.enterTelephone("1234567890")
        await register.enterPassword(password);
        await register.enterConfirmPassword(password);
        expect(register.isSubscribeChecked()).toBeChecked();
        await register.clickTermandConditon();
        await register.clickContinueToRegister();
        console.log('STATUS: ' + testInfo.status);


    })

    test("Login test_02", async ({ page, baseURL }) => {
        const login = new LoginPage(page);
        await page.goto(`${baseURL}route=account/login`)
        await login.enterEmail(email);
        await login.enterLoginPassword(password);
        await login.clickLoginBtn();
        expect(await page.title()).toBe("My Account");
    })

    test("Add to cart test_03", async ({ page, baseURL }) => {
        const login = new LoginPage(page);
        const homePage = new HomePage(page);
        const special = new SpecialHotPage(page);
        await page.goto(`${baseURL}route=account/login`)
        await login.login(email, password);
        await homePage.clickOnSpecialHotMenu();
        await special.addFirstProductToTheCart();
        const isCartVisible = await special.isToastVisible();
        expect(isCartVisible).toBeVisible();
    })
})
*/