import Page from "./page";
import BrowserActions from "../browser-actions";

export default class ForeseePage extends Page {
    constructor(...args) {
        super(...args);
    }

    async open() {
        await super.open("#fscommand=fsoptout");
    }

    async checkForCoreComponents() {
        await BrowserActions.pauseExecution(1200);
        await BrowserActions.waitForElementToAppear(this.foreseeOptOutButton);
    }

    async clickOnElement() {
        await BrowserActions.clickOnElement(this.foreseeOptOutButton);
    }
}
