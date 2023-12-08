/* global browser */
import Page from "./page";
import BrowserActions from "../browser-actions";

export default class ForeseePage extends Page {
    constructor(...args) {
        super(...args);
    }

    async open() {
        await browser.url(this.baseUrl + "/#fscommand=fsoptout");
    }

    async checkForCoreComponents() {
        await BrowserActions.pauseExecution(1200);
        await BrowserActions.waitForElementToAppear(this.foreseeOptOutButton);
    }

    async clickOnElement() {
        await BrowserActions.clickOnElementMobile(this.foreseeOptOutButton);
    }
}
