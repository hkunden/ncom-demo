import BrowserActions from "../browser-actions";
import Page from "./page";
import Helpers from "../helpers";

export default class SignInPage extends Page {
    constructor(...args) {
        super(...args);
        this.getPageContainerSelector = "#account-check";
        this.emailFieldSelector = ("//*[@name='email']");
        this.passwordFieldSelector = ("//*[@name='password']");
        this.nextButtonSelector = "#account-check-next-button";
    }

    async open() {
        await super.open("signin");
    }

    async checkForCoreComponents() {
        await BrowserActions.waitForElementToAppear(this.getPageContainerSelector);
    }

    async signInWithRegressionUserMobile() {
        await this.signInMobile(await this.getRegressionUserMobile(), this.password);
    }

    async signInWithRegressionUser() {
        await this.signIn(await this.getRegressionUser(), this.password);
    }

    async signIn(user, password) {
        await this.open();
        await BrowserActions.setTextOnElement(this.emailFieldSelector, user);
        await BrowserActions.clickOnElement(this.nextButtonSelector);
        await BrowserActions.waitForElementToDisappear(this.nextButtonSelector);
        await BrowserActions.setTextOnElement(this.passwordFieldSelector, password);
        await BrowserActions.clickOnElement(this.signInButtonSelector);
        try {
            await BrowserActions.waitForElementToDisappear(this.signInButtonSelector);
        } catch (e) {
            console.log(e);
        }
    }

    async signInMobile(user, password) {
        await this.open();
        await BrowserActions.pauseExecution(2000);
        await BrowserActions.clickElementInNativeContext(this.closeAppDownloaderOffer);
        await BrowserActions.setTextOnElement(this.emailFieldSelector, user);
        await BrowserActions.clickOnElementMobile(this.nextButtonSelector);
        await BrowserActions.setTextOnElement(this.passwordFieldSelector, password);
        await BrowserActions.scrollToElement(this.signInButtonSelectorMobile);
        await BrowserActions.clickOnElementInLoop(this.signInButtonSelectorMobile, 5);
        await BrowserActions.waitForElementToDisappear(this.signInButtonSelectorMobile);
    }

    async getRegressionUser() {
        const users = await Helpers.asyncReadFile("test_data/users.csv");
        let user;
        for (let i = 0; i < users.length; i++) {
            if ((users[i].includes((await BrowserActions.getPlatormName()).toString().toLowerCase())) &&
                users[i].includes((await BrowserActions.getBrowserName()).toString().toLowerCase())) {
                user = users[i].split(",")[1];
                break;
            }
        }
        return user;
    }

    async getRegressionUserMobile() {
        const filter = await BrowserActions.isDeviceIPhone() ? "iphone" : "android";
        const users = await Helpers.asyncReadFile("test_data/users.csv");
        return users.filter((e) => e.includes(filter)).toString().split(",")[1];
    }

    async signInFromCheckout(email, password) {
        await BrowserActions.setTextOnElement(this.emailFieldSelectorMobile, email);
        await BrowserActions.setTextOnElement(this.passwordFieldSelectorMobile, password);
        await BrowserActions.clickOnElementMobile(this.signInButtonSelectorMobile);
        if (!await BrowserActions.isBrowserSafari()) {
            await BrowserActions.waitForElementToDisappear(this.signInButtonSelector);
        }
    }

    async signInWithRegressionUserFromCheckout() {
        await this.signInFromCheckout(await this.getRegressionUser(), this.password);
    }

    async signInWithRegressionUserFromCheckoutMobile() {
        await this.signInFromCheckout(await this.getRegressionUserMobile(), this.password);
        await BrowserActions.waitForElementToDisappear(this.signInButtonSelector);
    }

    async signInWithAnniversaryUser(loyaltyLevel, cardInWallet, cardMember) {
        const user = await Helpers.getRandomElement(
            await Helpers.getAnniversaryUsersByLoyalty(loyaltyLevel, cardInWallet, cardMember));
        await this.signIn(user.email, user.password);
    }

    async signInWithAnniversaryUserMobile(loyaltyLevel, cardInWallet, cardMember) {
        const user = await Helpers.getRandomElement(
            await Helpers.getAnniversaryUsersByLoyalty(loyaltyLevel, cardInWallet, cardMember));
        await BrowserActions.clickElementInNativeContext(this.closeAppDownloaderOffer);
        await BrowserActions.setTextOnElement(this.emailFieldSelector, user.email);
        await BrowserActions.scrollToElement(this.nextButtonSelector);
        await BrowserActions.clickOnElementMobile(this.nextButtonSelector);
        await BrowserActions.scrollByPx(4, 100);
        await BrowserActions.setTextOnElement(this.passwordFieldSelector, user.password);
        await BrowserActions.scrollToElement(this.signInButtonSelectorMobile);
        await BrowserActions.clickOnElementMobile(this.signInButtonSelectorMobile);
        await BrowserActions.waitForElementToDisappear(this.signInButtonSelectorMobile);
    }

    async signInWithAnniversaryUserByLoyaltyLevel(loyaltyLevel, cardInWallet, cardMember) {
        const user = await Helpers.getRandomElement(
            await Helpers.getAnniversaryUsersByLoyalty(loyaltyLevel, cardInWallet, cardMember));
        await this.signInFromCheckout(user.email, user.password);
    }

    async signInWithAnniversaryUserEmailPassword(cardInWallet, cardMember) {
        const user = await Helpers.getRandomElement(
            await Helpers.getAnniversaryUsers(cardInWallet, cardMember));
        await this.signInFromCheckout(user.email, user.password);
    }

    async signInWithWLUser(scenario) {
        const obj = await Helpers.getWLUserByPlatformAndBrowser(scenario);
        await this.signIn(obj.user, this.password);
    }

    async signInWithWLUserMobile(scenario) {
        const obj = await Helpers.getWLUserByPlatform(scenario);
        await this.signInMobile(obj.user, this.password);
    }
}
