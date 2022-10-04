import BrowserActions from "../browser-actions";
import Page from "./page";

export default class Homepage extends Page {
    constructor(...args) {
        super(...args);

        this.headerLogoSelector = "a[href='/?origin=tab-logo']";
        this.topMenuCategories = "//*[@id='layer-1']//nav/ul/li";
        this.hamburgerMenu = "#Export_Settings";
        this.hamburgerMenuCategories = "#global-nav-mobile-primary > ul > li";
        this.nordstromLogo = "//a[@aria-label='Nordstrom Logo']";
        this.nordstromrackLogo = "//a[@aria-label='Nordstrom Rack Logo']";
        this.nordstromLogoMobile = "//a[@id='logo']";
    }

    async open() {
        await super.open("");
    }

    async checkForCoreComponents() {
        await BrowserActions.waitForElementToAppear(this.headerLogoSelector);
    }

    async getTopMenuCategories() {
        return await BrowserActions.getTextFromMultipleSelectors(this.topMenuCategories);
    }

    async clickOnHamburgerMenu() {
        for (let i = 0; i < 10; i++) {
            try {
                await BrowserActions.clickOnElementMobile(this.hamburgerMenu);
                break;
            } catch (err) {
                await BrowserActions.waitForElementToAppear(this.hamburgerMenu);
            }
        }
    }

    async getHamburgerMenuCategories() {
        return await BrowserActions.getTextFromMultipleSelectors(this.hamburgerMenuCategories);
    }

    async clickOnNordstromLogo() {
        if (!await BrowserActions.isSiteRack(global.baseUrl)) {
            await BrowserActions.clickOnElement(this.nordstromLogo);
        } else {
            await BrowserActions.clickOnElement(this.nordstromrackLogo);
        }
    }

    async clickOnNordstromLogoMobile() {
        await BrowserActions.clickOnElementMobile(this.nordstromLogoMobile);
    }
}
