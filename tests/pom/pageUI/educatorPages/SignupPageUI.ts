//POM - Page Object model
//PAGE - UI - contains all elements on a page
//TEST - contains test cases to interact with elements on a page
//@ts-check
//Step 1: Using css selector to find elements on each page

//selector: "input[name='firstName']"
// const TEN_BIEN = "input[name='firstname']"; //-> tao 1 gia tri co định có tên là TEN_BIEN với giá trị selector = "input[name='firstName']"
const FIRST_NAME_INPUT = "input[placeholder='Enter your first name']";
const LAST_NAME_INPUT = "input[placeholder='Enter your last name']";
const EMAIL_INPUT = "input[name='email']";
const PASSWORD_INPUT = "input[name='password']";
const SIGNUP_BUTTON = "form.u-widthFull > .Button";
const SIGNUP_WITH_GOOGLE_BUTTON = "button[data-testid$='google-login-button']";
const LOGIN_BUTTON = "[class^='u-marginTopMedium'] > button";
const MESSAGE_CONTENT = ".Message-content";
const LOGO = ".Wrapper-sc-1rwaraa-1.fGpaXE.u-backgroundWhite.u-flex.u-flexColumn";
const FIRST_NAME_ERROR = "body > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > form:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > div:nth-child(2)";
const LAST_NAME_ERROR_OPTIMZE = ".u-flex.u-gapSmall>div:last-child>div>div>div:last-child";

//Step 2: Create a class to store all elements on each page, and export it to use in test cases level
export default class SignupPageUI {
    //Step 3: Create methods to interact with elements on each page in test case level

    //way1: store elements as getter methods of class
    //lưu hàm vào
    // get tenBien () {
    //     return cy.get(TEN_BIEN);
    // }


    get firstNameInput() { return cy.get(FIRST_NAME_INPUT); }
    get lastNameInput() { return cy.get(LAST_NAME_INPUT); }
    get emailInput() { return cy.get(EMAIL_INPUT); }
    get passwordInput() { return cy.get(PASSWORD_INPUT); }
    get signupButton() { return cy.get(SIGNUP_BUTTON); }
    get signupWithGoogleButton() { return cy.get(SIGNUP_WITH_GOOGLE_BUTTON); }
    get loginButton() { return cy.get(LOGIN_BUTTON); }
    get messageContent() { return cy.get(MESSAGE_CONTENT); }

    //way2: store elements as properties of class
    elements = {
        url: () => cy.url(),
        firstNameInput: () => cy.get(FIRST_NAME_INPUT),
        lastNameInput: () => cy.get(LAST_NAME_INPUT),
        emailInput: () => cy.get(EMAIL_INPUT),
        passwordInput: () => cy.get(PASSWORD_INPUT),
        signupButton: () => cy.get(SIGNUP_BUTTON),
        signupWithGoogleButton: () => cy.get(SIGNUP_WITH_GOOGLE_BUTTON),
        loginButton: () => cy.get(LOGIN_BUTTON),
        messageContent: () => cy.get(MESSAGE_CONTENT),

    }
    //way3:
    enterURL() {
        cy.visit(
            "/signup?role=educator"
        );
        return this;
    }
    enterFirstName(firstName) {
        this.firstNameInput.type(firstName);
        return this;
    }

}

//step 1: tạo 1 biến cố định, chứa element (là selector của biến đó), eg: biến LOGIN -> lát nữa sẽ học
//step 2: tạo 1 hàm để lưu trữ biến đó, để mình kết hợp actions trên hàm đó
//step 3: export default class SignupPageUI {

//CLASS -> METHOD -> ACTIONS
//EXPORT CLASS -> Export method -> use in test cases level

//1.CLASS UI -> export class/methods/elements trong nó
//2.TEST CASES -> import class -> sử dụng các methods/elements trong class TC đó