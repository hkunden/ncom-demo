import BrowserActions from "../browser-actions";
import Page from "./page";

export default class SignInPage extends Page {
    constructor(...args) {
        super(...args);
        this.getPageContainerSelector = "#account-check";
        this.emailFieldSelector = "[name=\"email\"]";
        this.passwordFieldSelector = "[name=\"password\"]";
        this.nextButtonSelector = "#account-check-next-button";
        this.signInButtonSelector = "//button/span/div/span";
    }

    async open() {
        await super.open("signin");
    }

    async checkForCoreComponents() {
        await BrowserActions.waitForElementToAppear(this.getPageContainerSelector);
    }

}
