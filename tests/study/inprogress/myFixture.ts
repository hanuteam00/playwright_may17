import { test } from "@playwright/test";

type koushik = {
    age: number,
    email: string
}

//store in variable myFixtureTest to use in other files
const myFixtureTest = test.extend<koushik>({
    age: 27,
    email: "koushik350@gmail.com"
})

export const testFixture = myFixtureTest;

/*
import { test as myTest } from "@playwright/test";

type koushik = {
    age: number,
    email: string
}

// const myFixtureTest = myTest.extend<{
//     age: number,
//     email: string
// }>({

//store in variable myFixtureTest to use in other files
const myFixtureTest = myTest.extend<koushik>({
    age: 27,
    email: "koushik350@gmail.com"
})

export const test = myFixtureTest;
*/