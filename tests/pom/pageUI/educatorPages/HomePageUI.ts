import { Page, Locator } from "@playwright/test";

//Step 1: Using css selector to find elements on each page
const GREATING_MESSAGE = `.GreetingHeading > div`;
const INSTRUCTOR_BADGE = `div[class^='InstructorBadge']`;
const INSTRUCTOR_SUMMARY = `div[class='u-marginTopExtraSmall']`;
const CREATE_COURSE_SUMMARY = `div[class^='u-marginTopExtraSmall u-paddingTopTiny']`;
const COURSE_LIST = `div[class^='CoursesContainerWrapper']>div`;

//Step 2: Create a class to store all elements on each page, and export it to use in test cases level
export default class HomePageUI {
    constructor(public page: Page) { }

    //Step 3: Create methods to interact with elements on each page in test case level

    //way1: store elements as getter methods of class
    get greetingHeading(): Locator { return this.page.locator(GREATING_MESSAGE); }
    get instructorBadge(): Locator { return this.page.locator(INSTRUCTOR_BADGE); }
    get instructorSummary(): Locator { return this.page.locator(INSTRUCTOR_SUMMARY); }
    get createCourseSummary(): Locator { return this.page.locator(CREATE_COURSE_SUMMARY); }
    get courseList(): Locator { return this.page.locator(COURSE_LIST); }

    //way2: store elements as properties of class
    elements = {
        url: () => this.page.url(),
        greatingMessage: () => this.page.locator(GREATING_MESSAGE),
        instructorBadge: () => this.page.locator(INSTRUCTOR_BADGE),
        instructorSummary: () => this.page.locator(INSTRUCTOR_SUMMARY),
        createCourseSummary: () => this.page.locator(CREATE_COURSE_SUMMARY),
        courseList: () => this.page.locator(COURSE_LIST),
    }
}

/*
//@ts-check
//Step 1: Using css selector to find elements on each page
const GREATING_MESSAGE = `.GreetingHeading > div`;
const INSTRUCTOR_BADGE = `div[class^='InstructorBadge']`;
const INSTRUCTOR_SUMMARY = `div[class='u-marginTopExtraSmall']`;
const CREATE_COURSE_SUMMARY = `div[class^='u-marginTopExtraSmall u-paddingTopTiny']`;
const COURSE_LIST = `div[class^='CoursesContainerWrapper']>div`;


//Step 2: Create a class to store all elements on each page, and export it to use in test cases level
export default class HomePageUI {
    //Step 3: Create methods to interact with elements on each page in test case level

    //way1: store elements as getter methods of class
    get greatingMessage() { return cy.get(GREATING_MESSAGE); }
    get instructorBadge() { return cy.get(INSTRUCTOR_BADGE); }
    get instructorSummary() { return cy.get(INSTRUCTOR_SUMMARY); }
    get createCourseSummary() { return cy.get(CREATE_COURSE_SUMMARY); }
    get courseList() { return cy.get(COURSE_LIST); }

    //way2: store elements as properties of class
    elements = {
        url: () => cy.url(),
        greatingMessage: () => cy.get(GREATING_MESSAGE),
        instructorBadge: () => cy.get(INSTRUCTOR_BADGE),
        instructorSummary: () => cy.get(INSTRUCTOR_SUMMARY),
        createCourseSummary: () => cy.get(CREATE_COURSE_SUMMARY),
        courseList: () => cy.get(COURSE_LIST),

    }
}
*/