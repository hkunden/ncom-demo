import BrowserActions from "../browser-actions";
import Page from "./page";

export default class Homepage extends Page {
    constructor(...args) {
        super(...args);

        this.headerLogoSelector = "a[href='/?origin=tab-logo']";
    }
    async open() {
        await super.open("");
    }

    async checkForCoreComponents () {
        await BrowserActions.waitForElementToAppear(this.headerLogoSelector);
    }
}
