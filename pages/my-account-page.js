import BrowserActions from "../browser-actions";
import Page from "./page";

export default class MyAccountPage extends Page {
    constructor(...args) {
        super(...args);

        this.pageContainerSelector = "h3=Purchases";
        // We have to grab the image tag because the anchor tag
        // wrapping it has a size of zero and Webdriver thinks it
        // can't be clicked on
        this.orderLinkSelector = "a[href^='/my-account/orders'] img";
        this.getOrderFilter = "select";
    }

    async checkForCoreComponents () {
        await BrowserActions.waitForElementToAppear(this.pageContainerSelector);
        await BrowserActions.waitForElementToAppear(this.orderLinkSelector);
        await BrowserActions.waitForElementToAppear(this.getOrderFilter);
    }

    async open() {
        await super.open("/my-account");
    }

    async clickOnRandomOrder() {
        await BrowserActions.clickOnRandomElement(this.orderLinkSelector);
    }
}
