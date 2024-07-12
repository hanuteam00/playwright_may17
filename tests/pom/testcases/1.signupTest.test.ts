///<reference types="cypress" />

//step 4: import POM
import SignupPageUI from "../pages/educator/SignupPageUI";

import HomePageUI from "../pages/educator/HomePageUI";
import { slowCypressDown } from "cypress-slow-down";

//step 5: init POM
const signupPageUI = new SignupPageUI();

const homePageUI = new HomePageUI();

slowCypressDown(100);

describe("Signup Test", () => {
  beforeEach(() => {
    // Visit the signup page URL before each test
    cy.fixture('common/base').then((base) => {
      cy.visit(base.signupUrl);
    });
  });

  it.skip("TC1: sign up one account", () => {
    cy.visit("/signup?role=educator");
    cy.get(":nth-child(1) > .FormInput").type("engineer");
    cy.get(".u-gapSmall > :nth-child(2) > .FormInput").type("record22");
    cy.get("form.u-widthFull > :nth-child(2) > .FormInput")
      .clear()
      .type("engineer+record22@gotitapp.co");
    cy.get(".FormInputWrapper-sc-8v1liz-1 > .FormInput")
      .clear()
      .type("Aa123456@");
    //click sign up button
    cy.get("form.u-widthFull > .Button > .Button-label").click();
    //wait for text displayed to make sure that account is created
    cy.get(".InstructorBadge-sc-hz5s8q-0").should("have.text", "Instructor");
    cy.get(".u-paddingVerticalSmall > .u-marginTopExtraSmall").should(
      "have.text",
      "Manage your courses and students, all in one place!"
    );
    cy.get(".GreetingHeading > div").should("have.text", "Welcome, engineer!");

    //Save new account to json file in fixtures folder
    const currentTime = new Date();
    cy.readFile("cypress/fixtures/educator/generatedEducator.json").then(
      (data) => {
        data.push({
          email: `engineer+record22@gotitapp.co`,
          password: "Aa123456@",
          firstname: "engineer",
          lastname: "record22",
          createdTime: currentTime,
        });
        cy.writeFile("cypress/fixtures/educator/generatedEducator.json", data);
      }
    );

    //clear session to log out from the system
    cy.clearAllLocalStorage();
  });

  it.skip("TC2: signup 10 account - for loop", function () {
    //NOTE: PLEASE INPUT THE CORRECT NUMBER OF ACCOUNTS YOU WANT TO CREATE
    for (let i = 23; i <= 24; i++) {
      cy.visit("/signup?role=educator");
      //enter first name
      cy.get(":nth-child(1) > .FormInput").type("engineer");
      //enter last name
      cy.get(".u-gapSmall > :nth-child(2) > .FormInput").type(`record${i}`);
      //enter email
      cy.get("form.u-widthFull > :nth-child(2) > .FormInput")
        .clear()
        .type(`engineer+record${i}@gotitapp.co`);
      //enter password
      cy.get(".FormInputWrapper-sc-8v1liz-1 > .FormInput")
        .clear()
        .type("Aa123456@");
      //click sign up button
      cy.get("form.u-widthFull > .Button > .Button-label").click();
      //wait for text displayed to make sure that account is created
      cy.get(".InstructorBadge-sc-hz5s8q-0").should("have.text", "Instructor");
      cy.get(".u-paddingVerticalSmall > .u-marginTopExtraSmall").should(
        "have.text",
        "Manage your courses and students, all in one place!"
      );
      cy.get(".GreetingHeading > div").should(
        "have.text",
        "Welcome, engineer!"
      );

      //Save new account to json file in fixtures folder
      const currentTime = new Date();
      cy.readFile("cypress/fixtures/educator/generatedEducator.json").then(
        (data) => {
          data.push({
            email: `engineer+record${i}@gotitapp.co`,
            password: "Aa123456@",
            firstname: "engineer",
            lastname: `record${i}`,
            createdTime: currentTime,
          });
          cy.writeFile(
            "cypress/fixtures/educator/generatedEducator.json",
            data
          );
        }
      );

      //clear session to log out from the system
      cy.clearAllLocalStorage();
    }
  });

  it("TC3: signup 1 random account - without POM", function () {
    const rand = new Date().getTime();
    //miliseconds
    cy.visit("/signup?role=educator");

    //Part 1: Verify elements visible
    cy.get("input[placeholder='Enter your first name']").click().blur();
    cy.get("input[placeholder='Enter your last name']").click().blur();
    cy.get("input[placeholder='Enter your email']").click().blur();
    cy.get("input[placeholder='Enter your password']").click().blur();

    cy.contains("Create an Instructor account");
    cy.contains("First name");
    cy.contains("Please enter your first name.");
    cy.contains("Last name");
    cy.contains("Please enter your last name.");
    cy.contains("Email");
    cy.contains("Please enter your email address.");
    cy.contains("Password");
    cy.contains("Please enter your password.");
    cy.contains(
      "By creating an account, you agree to MathGPT’s Terms of Service and Privacy Policy"
    );
    cy.contains("Sign up");
    cy.contains("Or");
    cy.contains("Sign up with Google");
    cy.contains("Already have an account? Log in");

    //Part 2: Verify that user can signup successfully
    cy.get(":nth-child(1) > .FormInput").type("engineer");
    cy.get(".u-gapSmall > :nth-child(2) > .FormInput").type(`record${rand}`);
    cy.get("form.u-widthFull > :nth-child(2) > .FormInput").type(
      `engineer+record${rand}@gotitapp.co`
    );
    cy.get(".FormInputWrapper-sc-8v1liz-1 > .FormInput").type("Aa123456@");
    cy.get("form.u-widthFull > .Button > .Button-label").click();
    cy.get(".u-paddingVerticalSmall > .u-marginTopExtraSmall").should(
      "have.text",
      "Manage your courses and students, all in one place!"
    );
    cy.get(".GreetingHeading > div").should("have.text", `Welcome, engineer!`);

    //Save new account to json file in fixtures folder
    cy.readFile("cypress/fixtures/educator/generatedEducator.json").then(
      (data) => {
        data.push({
          email: `engineer+record${rand}@gotitapp.co`,
          password: "Aa123456@",
          firstname: "engineer",
          lastname: `record${rand}`,
          currentTime: rand,
        });
        cy.writeFile("cypress/fixtures/educator/generatedEducator.json", data);
      }
    );

    cy.clearAllLocalStorage();
  });

  it.only("TC4: signup 1 random account - with POM", function () {
    const rand = new Date().getTime();
    //miliseconds
    // cy.visit("/signup?role=educator");

    //Part 1: Verify elements visible
    //đối tương.lấy hàm ra.actions
    // signupPageUI.firstNameInput
    // signupPageUI.firstNameInput.type('');
    // signupPageUI.firstNameInput.type(`@AEF@%EGEWTgd@$%)(`);
    // signupPageUI.firstNameInput.clear();
    // signupPageUI.firstNameInput.hover()
    // signupPageUI.firstNameInput.click();

    signupPageUI.firstNameInput.type("engineer");
    signupPageUI.lastNameInput.type(`record${rand}`);
    signupPageUI.emailInput.type(`record${rand}`+"@gotitapp.co");

    signupPageUI.firstNameInput.click().blur();
    signupPageUI.lastNameInput.click().blur();
    signupPageUI.emailInput.click().blur();
    signupPageUI.passwordInput.click().blur();

    cy.verifyPageElements("educator/SignupPage.json");
    // cy.fixture("educator/SignupPage.json").then((data) => {
    //   const texts = data.texts;
    //   const links = data.links;

    //   // Verify texts
    //   texts.forEach((text: string) => {
    //     cy.contains(text).should("exist");
    //   });

    //   // Verify links
    //   links.forEach((link: string) => {
    //     // cy.get('link').should("exist");
    //     cy.contains("a", link).should("exist");
    //   });
    // });

    //Part 2: Verify that user can signup successfully
    signupPageUI.firstNameInput.type("engineer");
    signupPageUI.lastNameInput.type(`record${rand}`);
    signupPageUI.emailInput.type(
      `engineer+record${rand}@gotitapp.co`
    );
    signupPageUI.passwordInput.type("Aa123456@");
    signupPageUI.signupButton.click();

    homePageUI.greatingMessage.should("have.text", `Welcome, engineer!`);
    homePageUI.instructorSummary.should("have.text", "Manage your courses and students, all in one place!");

    //Save new account to json file in fixtures folder
    cy.writeGeneratedEducator("cypress/fixtures/educator/generatedEducator.json");
    // cy.readFile("cypress/fixtures/educator/generatedEducator.json").then(
    //   (data) => {
    //     data.push({
    //       email: `engineer+record${rand}@gotitapp.co`,
    //       password: "Aa123456@",
    //       firstname: "engineer",
    //       lastname: `record${rand}`,
    //       currentTime: rand,
    //     });
    //     cy.writeFile("cypress/fixtures/educator/generatedEducator.json", data);
    //   }
    // );

    cy.clearAllLocalStorage();
  });

});

