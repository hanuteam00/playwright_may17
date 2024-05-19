"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const cucumber_1 = require("@cucumber/cucumber");
const test_1 = require("@playwright/test");
let page;
let browser;
(0, cucumber_1.Given)("Open DuckDuckGo Website", function () {
    return __awaiter(this, void 0, void 0, function* () {
        browser = yield test_1.chromium.launch();
        page = yield browser.newPage();
        yield page.goto("https://duckduckgo.com");
    });
});
(0, cucumber_1.When)("I search for {string}", function (keyword) {
    return __awaiter(this, void 0, void 0, function* () {
        yield page.fill("#search_form_input_homepage", keyword);
        yield page.press("#search_form_input_homepage", "Enter");
    });
});
(0, cucumber_1.Then)("I should see results related to {string}", function (keyword) {
    return __awaiter(this, void 0, void 0, function* () {
        yield page.waitForSelector(`text=${keyword}`);
        yield browser.close();
    });
});
