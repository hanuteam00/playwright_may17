import { Page, Locator } from "@playwright/test";

//Step 1: Using css selector to find elements on each page
const EMAIL_INPUT = `input[name='email']`;
const PASSWORD_INPUT = `input[name='password']`;
const FORGOT_PASSWORD_BUTTON = `form.u-widthFull > .Button:nth-of-type(1)`;
const LOGIN_BUTTON = `form.u-widthFull > .Button:nth-of-type(2)`;
const LOGIN_WITH_GOOGLE_BUTTON = `button[data-testid$='google-login-button']`;
const SIGNUP_BUTTON = `div[class^='u-marginTopMedium']>button`
const EMAIL_ERROR = `form[class='u-widthFull'] > div:first-of-type > div > div> div:last-child`;
const PASSWORD_ERROR = `form[class='u-widthFull'] > div:last-of-type > div > div> div:last-child`;
const MESSAGE_CONTENT = `.Message-content`;
const ERROR_MESSAGE1 = `form[class='u-widthFull'] div:nth-child(1) div:nth-child(1) div:nth-child(2)`;
const ERROR_MESSAGE2 = `form[class='u-widthFull'] div:nth-child(2) div:nth-child(1) div:nth-child(2)`;

//Step 2: Create a class to store all elements on each page, and export it to use in test cases level
export default class LoginPageUI {
    constructor(public page: Page) { }

    //Step 3: Create methods to interact with elements on each page in test case level

    //way1: store elements as getter methods of class
    get emailInput(): Locator { return this.page.locator(EMAIL_INPUT); }
    get passwordInput(): Locator { return this.page.locator(PASSWORD_INPUT); }
    get forgotPasswordButton(): Locator { return this.page.locator(FORGOT_PASSWORD_BUTTON); }
    get loginButton(): Locator { return this.page.locator(LOGIN_BUTTON); }
    get loginWithGoogleButton(): Locator { return this.page.locator(LOGIN_WITH_GOOGLE_BUTTON); }
    get signupButton(): Locator { return this.page.locator(SIGNUP_BUTTON); }
    get emailError(): Locator { return this.page.locator(EMAIL_ERROR); }
    get passwordError(): Locator { return this.page.locator(PASSWORD_ERROR); }
    get messageContent(): Locator { return this.page.locator(MESSAGE_CONTENT); }
    get errorMessage1(): Locator { return this.page.locator(ERROR_MESSAGE1); }
    get errorMessage2(): Locator { return this.page.locator(ERROR_MESSAGE2); }

    //way2: store elements as properties of class
    elements = {
        url: () => this.page.url(),
        emailInput: () => this.page.locator(EMAIL_INPUT),
        passwordInput: () => this.page.locator(PASSWORD_INPUT),
        forgotPasswordButton: () => this.page.locator(FORGOT_PASSWORD_BUTTON),
        loginButton: () => this.page.locator(LOGIN_BUTTON),
        loginWithGoogleButton: () => this.page.locator(LOGIN_WITH_GOOGLE_BUTTON),
        signupButton: () => this.page.locator(SIGNUP_BUTTON),
        emailError: () => this.page.locator(EMAIL_ERROR),
        passwordError: () => this.page.locator(PASSWORD_ERROR),
        messageContent: () => this.page.locator(MESSAGE_CONTENT),
    }
}
/*
//@ts-check
//Step 1: Using css selector to find elements on each page

const EMAIL_INPUT = `input[name='email']`;
const PASSWORD_INPUT = `input[name='password']`;
const FORGOT_PASSWORD_BUTTON = `form.u-widthFull > .Button:nth-of-type(1)`;
const LOGIN_BUTTON = `form.u-widthFull > .Button:nth-of-type(2)`;
const LOGIN_WITH_GOOGLE_BUTTON = `button[data-testid$='google-login-button']`;
const SIGNUP_BUTTON =`div[class^='u-marginTopMedium']>button`
const EMAIL_ERROR = `form[class='u-widthFull'] > div:first-of-type > div > div> div:last-child`;
const PASSWORD_ERROR = `form[class='u-widthFull'] > div:last-of-type > div > div> div:last-child`;
const MESSAGE_CONTENT = `.Message-content`;
const ERROR_MESSAGE1 = `form[class='u-widthFull'] div:nth-child(1) div:nth-child(1) div:nth-child(2)`;
const ERROR_MESSAGE2 = `form[class='u-widthFull'] div:nth-child(2) div:nth-child(1) div:nth-child(2)`;

//Step 2: Create a class to store all elements on each page, and export it to use in test cases level
export default class LoginPageUI {
    //Step 3: Create methods to interact with elements on each page in test case level

    //way1: store elements as getter methods of class
    get emailInput() { return cy.get(EMAIL_INPUT); }
    get passwordInput() { return cy.get(PASSWORD_INPUT); }
    get forgotPasswordButton() { return cy.get(FORGOT_PASSWORD_BUTTON); }
    get loginButton() { return cy.get(LOGIN_BUTTON); }
    get loginWithGoogleButton() { return cy.get(LOGIN_WITH_GOOGLE_BUTTON); }
    get signupButton() { return cy.get(SIGNUP_BUTTON); }
    get emailError() { return cy.get(EMAIL_ERROR); }
    get passwordError() { return cy.get(PASSWORD_ERROR); }
    get messageContent() { return cy.get(MESSAGE_CONTENT); }
    get errorMessage1() { return cy.get(ERROR_MESSAGE1); }
    get errorMessage2() { return cy.get(ERROR_MESSAGE2); }

    //way2: store elements as properties of class
    elements = {
        url: () => cy.url(),
        emailInput: () => cy.get(EMAIL_INPUT),
        passwordInput: () => cy.get(PASSWORD_INPUT),
        forgotPasswordButton: () => cy.get(FORGOT_PASSWORD_BUTTON),
        loginButton: () => cy.get(LOGIN_BUTTON),
        loginWithGoogleButton: () => cy.get(LOGIN_WITH_GOOGLE_BUTTON),
        signupButton: () => cy.get(SIGNUP_BUTTON),
        emailError: () => cy.get(EMAIL_ERROR),
        passwordError: () => cy.get(PASSWORD_ERROR),
        messageContent: () => cy.get(MESSAGE_CONTENT),

    }
}
*/