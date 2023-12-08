/* global $, $$, browser */
/* eslint-disable no-console */
import {CHROME, EDGE, FIREFOX, GALAXY, INTERNET_EXPLORER, IPHONE, SAFARI, STANDARD_WAIT_TIME_MS} from "./constants";
import Helpers from "./helpers";
import {Key} from "webdriverio";

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

const getBrowserName = async () => {
    return ((await browser.capabilities.browserName) || "").toLowerCase();
};

export default class BrowserActions {
    static async clickOnElement(selector, options = {}) {
        const element = await getElement(selector);

        await element.waitForClickable({timeout: 3000});
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

    static async touchElementMobile(selector, offsetY) {
        await this.touchElementMobileXY(selector, 25, offsetY);
    }

    static async touchElementMobileXY(selector, offsetX, offsetY) {
        const element = await getElement(selector);
        const x = await element.getLocation("x") + offsetX;
        const y = await element.getLocation("y") + offsetY;
        await this.touchElementByPoints(x, y);
    }

    static async touchElementByPoints(x, y) {
        await browser.touchAction({
            action: "tap",
            x: x,
            y: y
        });
    }

    static async clickElementInNativeContext(selector) {
        const context = await browser.getContext();
        await browser.switchContext("NATIVE_APP");
        if (await this.isElementDisplayed(selector)) {
            await this.clickOnElementMobile(selector);
        }
        await browser.switchContext(context);
    }

    static async clickOnRandomElement(selector) {
        const element = await Helpers.getRandomElement(await getElement(selector, {matchAll: true}));
        await this.pauseExecution(200);
        await element.click();
    }

    static async clickOnRandomElementWithScroll(selector) {
        const element = await Helpers.getRandomElement(await getElement(selector, {matchAll: true}));
        await this.pauseExecution(200);
        await element.scrollIntoView();
        await element.click();
    }

    static async clickOnAllElements(selector) {
        const elements = await getElement(selector);
        for (const element of elements) {
            await element.waitForExist();
            await this.clickOnElementInLoop(element);
            await this.pauseExecution(500);
        }
    }

    static async clickOnElementInLoop(selector, maxRetries) {
        let retryCount = 0;
        while (retryCount <= maxRetries && await this.isElementDisplayed(selector)) {
            retryCount++;
            try {
                const element = await getElement(selector);
                await element.waitForExist();
                await element.click();
            } catch (ex) {
                console.log("Mobile Element not found for clicking. Retrying.");
            }
            await this.pauseExecution(500);
        }
    }

    static async clickOnElementInLoopWithSelector(selector, maxRetries, checkSelector) {
        let retryCount = 0;
        while (retryCount <= maxRetries && !await this.isElementDisplayed(checkSelector)) {
            retryCount++;
            try {
                const element = await getElement(selector);
                await element.waitForExist();
                await element.click();
            } catch (ex) {
                console.log(ex);
            }
            await this.pauseExecution(500);
        }
    }

    static async getElementCount(selector) {
        return await (await getElement(selector, {matchAll: true, waitForExist: false})).length;
    }

    static async mouseOverElement(selector, options = {}) {
        const element = await getElement(selector);
        await element.waitForClickable();
        await element.moveTo(options);
        await this.pauseExecution(200);
    }

    static async mouseOverElementSafari(selector) {
        const {x, y} = await $(selector).getLocation();
        browser.performActions([
            {
                type: "pointer",
                id: "finger1",
                parameters: {
                    pointerType: "mouse"
                },
                actions: [
                    {
                        type: "pointerMove",
                        duration: 0,
                        x: x + 1,
                        y: y + 1
                    }
                ]
            }
        ]);
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

    static async isDeviceIPhone() {
        const device = await this.getDeviceName() || "";

        return device.includes(IPHONE);
    }

    static async isDeviceAndroid() {
        const platform = await this.getPlatormName() || "";

        return platform.includes(GALAXY);
    }

    static async getDeviceName() {
        return ((await browser.capabilities.deviceName) || "").toLowerCase();
    }

    static async getPlatormName() {
        return ((await browser.capabilities.platformName) || "").toLowerCase();
    }

    static async getBrowserName() {
        return ((await browser.capabilities.browserName) || "").toLowerCase();
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

        await element.waitForExist();
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

    static async scrollByPx(count, px) {
        for (let i = 0; i < count; i++) {
            await browser.execute(`window.scrollBy(1,${px});`);
        }
    }

    static async scrollDownIPhone(count) {
        for (let i = 0; i < count; i++) {
            await browser.execute("mobile: scroll", {direction: "down"});
        }
    }

    static async slowScrollByPx(count, px) {
        for (let i = 0; i < count; i++) {
            await this.scrollByPx(1, px);
            await this.pauseExecution(500);
        }
    }

    static async setTextOnElement(selector, text = "") {
        const element = await getElement(selector);

        await element.waitForExist();
        await element.setValue(text.toString());

        await this.pauseExecution(2000);
    }

    static async clearTextValue(selector) {
        await (await getElement(selector)).clearValue();
    }

    static async clearTextValueWithPressKeys(selector) {
        await (await getElement(selector)).click();
        await BrowserActions.pressKeys([Key.Ctrl, "a"]);
        await BrowserActions.pressKeys(Key.Delete);
    }

    static async waitForElementToDisappear(selector, options = {}) {
        options.reverse = true;
        await (await getElement(selector, {waitForExist: false})).waitForDisplayed(options);
    }

    static async waitForElementToAppear(selector) {
        await (await getElement(selector));
    }

    static async waitForElement(selector) {
        await $(selector).waitForClickable();
    }

    static async isSiteNCOM(site) {
        return site.includes("nordstrom.com");
    }

    static async isSiteRack(site) {
        return site.includes("rack");
    }

    static isSiteRackCheck(site) {
        return site.includes("rack");
    }

    static async isSiteNCA(site) {
        return site.includes("nordstrom.ca");
    }

    static isSiteNCOMCheck(site) {
        return site.includes("nordstrom.com");
    }

    static isSiteNCACheck(site) {
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

    static async scrollToPageBottomMobile() {
        await BrowserActions.scrollByPx(60, 200);
    }

    static async getPageUrl(options = {}) {
        options.timeoutMsg = options.timeoutMsg || `Unable to retrieve URL after ${options.waitTimeout}ms`;
        return await browser.waitUntil(async () => await browser.getUrl(), options);
    }

    static async getTextFromSelector(selector) {
        return (await getElement(selector)).getText();
    }

    static async getTextFromMultipleSelectors(selector) {
        const elements = await getElement(selector, {matchAll: true});
        const elementsText = [];
        for (let i = 0, max = elements.length; i < max; i += 1) {
            elementsText.push(await elements[i].getText());
        }
        return elementsText;
    }

    static async getElementFromCollectionByIndex(selector, index) {
        const collection = await getElement(selector, {matchAll: true});
        return collection[index];
    }

    static async getTextFromSelectorByIndex(selector, index) {
        return (await this.getElementFromCollectionByIndex(selector, index)).getText();
    }

    static async isElementDisplayed(selector) {
        return await (await $(selector)).isDisplayed();
    }

    static async isAnyElementDisplayed(selector) {
        const elementArray = await $$(selector);
        let isDisplayed = false;
        for (const elementArrayElement of elementArray) {
            if (await elementArrayElement.isDisplayed()) {
                isDisplayed = true;
            }
        }
        return isDisplayed;
    }

    static async isDisplayedInViewport(selector) {
        return await (await $(selector)).isDisplayedInViewport();
    }

    static async isElementDisplayedInNativeContext(selector) {
        const context = await browser.getContext();
        await browser.switchContext("NATIVE_APP");
        await browser.switchContext(context);
        return await this.isElementDisplayed(selector);
    }

    static async getAttributeFromSelector(selector, attribute) {
        return (await getElement(selector)).getAttribute(attribute);
    }

    static async getAttributeFromSelectorByIndex(selector, attribute, index) {
        return (await this.getElementFromCollectionByIndex(selector, index)).getAttribute(attribute);
    }

    static async getAttributeFromSelectorArray(selector, attribute) {
        const elements = await getElement(selector, {matchAll: true});
        const result = [];
        for (let i = 0; i < elements.length; i++) {
            result.push(await elements[i].getAttribute(attribute));
        }
        return result;
    }

    static async switchToTab(tab) {
        return browser.switchWindow(tab);
    }

    static async switchToIFrame(selector) {
        await browser.switchToFrame(await getElement(selector));
    }

    static async clickOnElementByIndex(selector, index, options = {}) {
        const element = await this.getElementFromCollectionByIndex(selector, index);
        await this.pauseExecution(200);
        await element.click(options);
    }

    static async scrollToElementByIndex(selector, index) {
        const element = await this.getElementFromCollectionByIndex(selector, index);
        await this.pauseExecution(200);
        await this.scrollToElement(element);
    }

    static async clickOnElementByIndexMobile(selector, index) {
        const element = await this.getElementFromCollectionByIndex(selector, index);
        await this.pauseExecution(200);
        await element.click();
    }

    static async getRandomGWPBrandTitle(selector, index) {
        const element = await this.getElementFromCollectionByIndex(selector, index);
        return (element).getText();
    }

    static async clickRandomElementFilterByText(selector, text) {
        const elements = await getElement(selector, {matchAll: true});
        for (let i = elements.length - 1; i >= 0; i--) {
            const elementText = await elements[i].getText();
            if (!elementText.includes(text)) {
                elements[i].click();
                break;
            }
        }
    }

    static async clickBackNavigationButton() {
        await browser.back();
    }

    static async refreshPage() {
        await browser.refresh();
    }

    static async getRandomNumber(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    static async getRandomStylistName(selector, index) {
        const element = await this.getElementFromCollectionByIndex(selector, index);
        return (element).getText();
    }

    static async getRandomElementFromCollection(selector) {
        const collection = await getElement(selector, {matchAll: true});
        return collection[await BrowserActions.getRandomNumber(0, collection.length)];
    }

    static async waitForUrlToContainString(expectedString) {
        for (let i = 0; i < 5; i++) {
            if (this.getPageUrl().toString().includes(expectedString)) {
                break;
            }
            await this.pauseExecution(200);
        }
    }
}
