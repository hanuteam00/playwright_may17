
import { testFixture } from "./myFixture"
// import { test } from "@playwright/test";

testFixture("fixture demo", async ({ age, email }) => {
    console.log(age + 15, email.toUpperCase());

})

/*
import { test } from "./myFixture"

test("fixture demo", async ({ age, email }) => {
    console.log(age + 15, email.toUpperCase());

})
*/