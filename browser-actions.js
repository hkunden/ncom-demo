/* global $, $$, browser */
import {
    STANDARD_WAIT_TIME_MS,
    INTERNET_EXPLORER,
    SAFARI,
    CHROME,
    EDGE,
    FIREFOX
} from "./constants";

const getElement = async (selector, options = {}) => {
    const {
        matchAll,
        waitForExist = true
    } = options;

    if (waitForExist) {
        await $(selector).waitForExist();
    }

    if (!matchAll) {
        return await $(selector);
    }

    return await $$(selector);
};

const getRandomElementFromCollection = async (selector) => {
    const collection = await getElement(selector, {matchAll: true});

    return collection[Math.random() * collection.length];
};

const getBrowserName = async () => {
    return ((await browser.capabilities.browserName) || "").toLowerCase();
};

const getElementFromCollectionByIndex = async (value, selector) => {
    const collection = await getElement(selector, {matchAll: true});
    return collection[value];
};

export default class BrowserActions {
    static async clickOnElement(selector, options = {}) {
        const element = await getElement(selector);

        await element.waitForClickable();
        await element.moveTo(options);
        await element.click(options);
    }

    static async clickOnElementMobile(selector) {
        const element = await getElement(selector);

        await element.waitForExist();
        await element.click();
    }

    static async clickOnElementUsingScript(locator) {
        const element = await getElement(locator);
        await browser.execute("arguments[0].click();", element);
    }

    static async touchElementMobile(selector) {
        const element = await getElement(selector);

        await element.waitForExist();
        await browser.touchAction({
            action: "tap",
            element: element
        });
    }

    static async touchElementByPoints(x, y) {
        await browser.touchAction({
            action: "tap",
            x: x,
            y: y
        });
    }

    static async clickOnRandomElement(selector, options = {}) {
        const element = await getRandomElementFromCollection(selector);

        await element.moveTo();
        await this.pauseExecution(200);
        await element.click(options);
    }

    static async getElementCount(selector) {
        return await (await getElement(selector, {matchAll: true})).length;
    }

    static async mouseOverElement(selector, options = {}) {
        const element = await getElement(selector);

        await element.waitForClickable();
        await element.moveTo(options);
        await this.pauseExecution(200);
    }

    static async isBrowserInternetExplorer() {
        const browser = await getBrowserName() || "";

        return browser === INTERNET_EXPLORER;
    }

    static async isBrowserSafari() {
        const browser = await getBrowserName() || "";

        return browser === SAFARI;
    }

    static async isBrowserEdge() {
        const browser = await getBrowserName() || "";

        return browser === EDGE;
    }

    static async isBrowserChrome() {
        const browser = await getBrowserName() || "";

        return browser === CHROME;
    }

    static async isBrowserFirefox() {
        const browser = await getBrowserName() || "";

        return browser === FIREFOX;
    }

    static async pauseExecution(time = STANDARD_WAIT_TIME_MS) {
        await browser.pause(time);
    }

    static async pauseExecutionUntilConditionMet(conditionFn) {
        await browser.waitUntil(conditionFn);
    }

    static async pressKeys(keys) {
        await browser.keys(keys);
    }

    static async selectDropdownOptionByValue(selector, value) {
        const element = await getElement(selector);

        await element.waitForClickable();
        await element.selectByAttribute("value", value);
    }

    static async selectDropdownOptionByValueMobile(selector, value) {
        const element = await getElement(selector);

        await element.waitForExist();
        await element.selectByAttribute("value", value);
    }

    static async scrollToElement(selector) {
        await (await getElement(selector)).scrollIntoView();
    }

    static async setTextOnElement(selector, text = "") {
        const element = await getElement(selector);

        await element.waitForClickable();
        await element.setValue(text.toString());

        await this.pauseExecution(2000);
    }

    static async waitForElementToDisappear(selector, options = {}) {
        options.reverse = true;
        await (await getElement(selector, {waitForExist: false})).waitForDisplayed(options);
    }

    static async waitForElementToAppear(selector) {
        await (await getElement(selector));
    }

    static async isSiteNCOM(site) {
        return site.includes("nordstrom.com");
    }

    static async isSiteRack(site) {
        return site.includes("rack");
    }

    static async isSiteNCA(site) {
        return site.includes("nordstrom.ca");
    }

    static async scrollToPageBottom() {
        const isIE = await this.isBrowserInternetExplorer();
        let scrollCommand;

        if (isIE) {
            scrollCommand = browser.execute("window.scrollTo({top: document.body.scrollHeight, behavior: 'smooth'})");
        } else {
            // We do the scrolling twice to sort of emulate a smooth scroll which isn't supported
            // natively in IE
            scrollCommand = browser
                .execute("window.scrollTo(0, (document.body.scrollHeight / 2))")
                .then(() => browser.execute("window.scrollTo(0, document.body.scrollHeight)"));
        }

        await scrollCommand;
    }

    static async getPageUrl(options = {}) {
        options.timeoutMsg = options.timeoutMsg || `Unable to retrieve URL after ${options.waitTimeout}ms`;
        return await browser.waitUntil(async () => await browser.getUrl(), options);
    }

    static async getTextFromSelector(selector) {
        return (await getElement(selector)).getText();
    }

    static async getTextFromMultipleSelectors(selector) {
        const newVars = await getElement(selector, {matchAll: true});
        const taskNames = [];
        for (let i = 0, max = newVars.length; i < max; i += 1) {
            taskNames.push(await newVars[i].getText());
        }
        return taskNames;
    }

    static async isElementDisplayed(selector) {
        return await (await $(selector)).isDisplayed();
    }

    static async getAttributeFromSelector(selector, attribute) {
        return (await getElement(selector)).getAttribute(attribute);
    }

    static async switchToTab(tab) {
        return browser.switchWindow(tab);
    }

    static async clickOnElementByIndex(value, selector, options = {}) {
        const element = await getElementFromCollectionByIndex(value, selector);
        await this.pauseExecution(200);
        await element.click(options);
    }

    static async clickOnElementByIndexMobile(value, selector) {
        const element = await getElementFromCollectionByIndex(value, selector);
        await this.pauseExecution(200);
        await element.click();
    }
}
