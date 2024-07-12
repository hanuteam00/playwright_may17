
import { Page } from "@playwright/test";
export default class RegisterPage {
    constructor(public page: Page) { }

    async enterFirstName(firstname: string) {
        await this.page.locator("#input-firstname")
            .type(firstname);
    }
    async enterLastName(lastname: string) {
        await this.page.locator("input[name='lastname']")
            .type(lastname);
    }
    async enterEmail(email: string) {
        await this.page.locator("input[name='email']")
            .type(email);
    }

    async enterTelephone(phone: string) {
        await this.page.locator("input[name='telephone']")
            .type(phone);
    }

    async enterPassword(password: string) {
        await this.page.locator("input[name='password']")
            .type(password);
    }

    async enterConfirmPassword(password: string) {
        await this.page.locator("input[name='confirm']")
            .type(password);
    }

    isSubscribeChecked() {
        return this.page.locator("#input-newsletter-no");
    }

    async clickTermandConditon() {
        await this.page.click("//label[@for='input-agree']")
    }

    async clickContinueToRegister() {
        await Promise.all([
            this.page.waitForNavigation({ waitUntil: "networkidle" }),
            this.page.click("input[value='Continue']")
        ])
    }

}

/*
import { Page, Locator } from "@playwright/test";

export default class RegisterPage {
    constructor(public page: Page) { }

    get firstNameInput(): Locator {
        return this.page.locator("#input-firstname");
    }

    get lastNameInput(): Locator {
        return this.page.locator("input[name='lastname']");
    }

    get emailInput(): Locator {
        return this.page.locator("input[name='email']");
    }

    get telephoneInput(): Locator {
        return this.page.locator("input[name='telephone']");
    }

    get passwordInput(): Locator {
        return this.page.locator("input[name='password']");
    }

    get confirmPasswordInput(): Locator {
        return this.page.locator("input[name='confirm']");
    }

    get subscribeCheckbox(): Locator {
        return this.page.locator("#input-newsletter-no");
    }

    get termsAndConditionsLabel(): Locator {
        return this.page.locator("//label[@for='input-agree']");
    }

    get continueButton(): Locator {
        return this.page.locator("input[value='Continue']");
    }
}

*/