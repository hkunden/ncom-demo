/* global $, $$, browser */
/* eslint-disable no-console */
import {DEFAULT_ENVIRONMENT} from "../constants";
import BrowserActions from "../browser-actions";
import Helpers from "../helpers";

export default class Page {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
        this.password = "vasilenkoKPI1";
        this.signInMenuSelector = "#controls-account-links > span";
        this.signInLinkSelector = "a[href*='/signin?cm_sp']";
        this.signOutLinkSelector = "//*[@id='account-links']//div/section/a";
        this.signOutLinkSelectorMobile = "//*[@id='global-nav-mobile-primary']/div[2]/div/a[2]";
        this.signInLinkSelectorMobile = "a[href*='/signin?cm_re']";
        this.yourAccountLinkSelector = "a=Your Account";
        this.recShelfContainerSelector = "[id^='product-recommendations-shelf-']";
        this.recShelfRightArrowSelector = "[aria-label=\"next slide\"]";
        this.recShelfLeftArrowSelector = "[aria-label=\"previous slide\"]";
        this.recShelfProductSelector = `${this.recShelfContainerSelector} a[href^='/s/']`;
        this.searchInputSelector = "#keyword-search-input";
        this.searchInputSelectorMobile = "//*[@id='layer-4']//button/div";
        this.searchSuggestions = "#search-suggestions > li:nth-child(1)";
        this.emailFieldSelector = ("[name='email']");
        this.emailFieldSelectorMobile = ("//*[@name='email']");
        this.passwordFieldSelector = "[name=\"password\"]";
        this.passwordFieldSelectorMobile = ("//*[@name='password']");
        this.nextButtonSelector = "#account-check-next-button";
        this.signInButtonSelector = "#sign-in > button";
        this.signInButtonSelectorMobile = "//*[@alt='sign in button']";
        this.internationalShippingModalHeader = "#dialog-description";
        this.shippingCountryDropdownSelector = "//*[@id='dialog-description']//form//div[1]//select";
        this.changeCountryLinkSelector = "a[name='changeCountry'] > div";
        this.saveShippingPreferencesButtonSelector = "#dialog-description button";
        this.welcomeModalHeaderSelector = "#modalTitle";
        this.resetShippingCountryLinkSelector = "a=ship to a U.S. address";
        this.closeModalLinkSelector = "//*[@id='dialog-description']/a";
        this.foreseeOptOutButton = "#acsOptOutButton";
        this.recentSearches = "//*[contains(@id,'recent-searches-')]";
        this.recentSearchesMobile = "//*[contains(@id,'recent-searches-')]";
        this.clearSearchForm = "//*[@aria-labelledby='reset-search-label']";
        this.clearSearchFormMobile = "//*[text()='Clear']";
        this.searchFormMobile = "//*[@href='#search']/*";
        this.globalNavMenuMobile = "//*[@id='global-nav-toggle closed']";
        this.closeAppDownloaderOffer = "//*[@name='Close app download offer']";
        this.hamburgerMenuCategories = "#global-nav-mobile-primary > ul > li";
        this.hamburgerMenu = "//*[@id='global-nav-toggle closed']";
        this.mobileSecondaryNavSubCategories = "#global-nav-mobile-secondary > ul > li";
        this.mobileSecondaryNav = "#global-nav-mobile-secondary";
    }

    async open(path = "", settingCookies = true) {
        this.originalBrowserPath = this.baseUrl + "/" + path;

        await browser.url(this.originalBrowserPath);
        await browser.waitUntil(
            () => browser.execute(() => document.readyState === "complete"),
            {
                timeout: 60000,
                timeoutMsg: `Failed to navigate to ${this.baseUrl}/${path}`
            }
        );

        if (settingCookies) {
            const environmentName = process.env.ENVIRONMENT_NAME || DEFAULT_ENVIRONMENT;
            let refresh = false;

            const cookies = [
                {
                    name: "nord-client-id",
                    value: process.env.NORD_CLIENT_ID
                }
            ];

            if (environmentName !== DEFAULT_ENVIRONMENT) {
                refresh = true;
                cookies.push({
                    name: "mwp-origin",
                    value: environmentName
                });
            }

            await browser.setCookies(cookies);

            if (refresh) {
                // We need to refresh the page so the server has a
                // chance to read the origin cookie
                await browser.refresh();

                await browser.waitUntil(
                    () => browser.execute(() => document.readyState === "complete"),
                    {
                        timeout: 60000,
                        timeoutMsg: `Failed to navigate to ${this.baseUrl}/${path}`
                    }
                );
            }
        }
    }

    async navigateToSignInPage() {
        await BrowserActions.mouseOverElement(this.signInMenuSelector);
        await BrowserActions.clickOnElement(this.signInLinkSelector);
        await browser.waitUntil(
            () => browser.execute(() => document.readyState === "complete"),
            {
                timeout: 60000,
                timeoutMsg: "Failed to navigate to SignIn page"
            }
        );
    }

    async navigateToSignInPageMobile() {
        await this.openMainMenuMobile();
        await BrowserActions.scrollToElement(this.signInLinkSelectorMobile);
        await BrowserActions.clickOnElementMobile(this.signInLinkSelectorMobile);
        await browser.waitUntil(
            () => browser.execute(() => document.readyState === "complete"),
            {
                timeout: 60000,
                timeoutMsg: "Failed to navigate to SignIn page"
            }
        );
    }

    async hasBeenRedirectedToSignIn() {
        const pageUrl = await BrowserActions.getPageUrl() || "";

        return pageUrl.includes("/signin");
    }

    async signIn(email, password, options = {}) {
        const {
            navigateToSignInPage = true,
            skipReturnUrl = false
        } = options;

        if (navigateToSignInPage) {
            this.originalBrowserPath = await BrowserActions.getPageUrl();
            await this.navigateToSignInPage();
        }

        const signInUrl = new URL(await BrowserActions.getPageUrl());
        // The double selectors is becuase of https://jira.nordstrom.com/browse/SBX-3109
        // TODO: Remove when the bug is fixed
        const returnUrl = (signInUrl.searchParams.get("ReturnURL") || signInUrl.searchParams.get("returnUrl"));

        await BrowserActions.setTextOnElement(this.emailFieldSelector, email || process.env.EMAIL);
        await BrowserActions.clickOnElement(this.nextButtonSelector);
        await BrowserActions.waitForElementToDisappear(this.nextButtonSelector);
        await BrowserActions.setTextOnElement(this.passwordFieldSelector, password || process.env.PASSWORD);
        await BrowserActions.clickOnElement(this.signInButtonSelector);
        await BrowserActions.waitForElementToDisappear(this.signInButtonSelector);

        // This is to get around a bug where the returnURL of the sign in link
        // doesn't get set right if the page is navigated to via hard-nav
        // TODO: Remove when the bug is fixed
        // https://jira.nordstrom.com/browse/SBX-3107

        if (!returnUrl && !skipReturnUrl) {
            await browser.url(this.originalBrowserPath);
        }
    }

    async signInMobile(user, password, options = {}) {
        const {
            navigateToSignInPage = true,
            skipReturnUrl = false
        } = options;

        if (navigateToSignInPage) {
            this.originalBrowserPath = await BrowserActions.getPageUrl();
            await this.navigateToSignInPageMobile();
        }

        const signInUrl = new URL(await BrowserActions.getPageUrl());
        // The double selectors is becuase of https://jira.nordstrom.com/browse/SBX-3109
        // TODO: Remove when the bug is fixed
        const returnUrl = (signInUrl.searchParams.get("ReturnURL") || signInUrl.searchParams.get("returnUrl"));

        await BrowserActions.setTextOnElement(this.emailFieldSelectorMobile, user);
        await BrowserActions.scrollToElement(this.nextButtonSelector);
        await BrowserActions.clickOnElementInLoop(this.nextButtonSelector, 5);
        await BrowserActions.setTextOnElement(this.passwordFieldSelectorMobile, password);
        await BrowserActions.scrollToElement(this.signInButtonSelectorMobile);
        await BrowserActions.clickOnElementInLoop(this.signInButtonSelectorMobile, 5);
        await BrowserActions.waitForElementToDisappear(this.signInButtonSelectorMobile);

        // This is to get around a bug where the returnURL of the sign in link
        // doesn't get set right if the page is navigated to via hard-nav
        // TODO: Remove when the bug is fixed
        // https://jira.nordstrom.com/browse/SBX-3107

        if (!returnUrl && !skipReturnUrl) {
            await browser.url(this.originalBrowserPath);
        }

        await browser.waitUntil(
            () => browser.execute(() => document.readyState === "complete"),
            {
                timeout: 60000,
                timeoutMsg: "Failed to navigate to Page after sign-in."
            }
        );
    }

    async signInWithRegressionUser() {
        const users = await Helpers.asyncReadFile("test_data/users.csv");
        let user;
        for (let i = 0; i < users.length; i++) {
            if ((users[i].includes(await BrowserActions.getPlatormName())) &&
                users[i].includes(await BrowserActions.getBrowserName())) {
                user = users[i].split(",")[1];
                break;
            }
        }
        await this.signIn(user, this.password);
    }

    async signOut() {
        if (!await BrowserActions.isBrowserSafari()) {
            await BrowserActions.pauseExecution(2000);
            await BrowserActions.mouseOverElement(this.signInMenuSelector);
        } else {
            await BrowserActions.pauseExecution(3000);
            await BrowserActions.mouseOverElementSafari(this.signInMenuSelector);
        }
        await BrowserActions.waitForElementToAppear(this.signOutLinkSelector);
        await BrowserActions.clickOnElementInLoop(this.signOutLinkSelector, 3);
        await BrowserActions.pauseExecution(2000);
    }

    async signOutMobile() {
        await BrowserActions.clickOnElementMobile(this.signOutLinkSelectorMobile);
    }

    async changeShippingCountryTo(countryCode) {
        await BrowserActions.scrollToPageBottom();
        if (!await BrowserActions.isBrowserSafari()) {
            await BrowserActions.clickOnElement(this.changeCountryLinkSelector);
        } else {
            await BrowserActions.clickOnElementMobile(this.changeCountryLinkSelector);
        }
        await BrowserActions.waitForElementToAppear(this.internationalShippingModalHeader);
        await BrowserActions.selectDropdownOptionByValue(this.shippingCountryDropdownSelector, countryCode);
        await BrowserActions.clickOnElement(this.saveShippingPreferencesButtonSelector);
        await BrowserActions.waitForElementToAppear(this.welcomeModalHeaderSelector);

        await BrowserActions.clickOnElement(this.closeModalLinkSelector);
        await BrowserActions.waitForElementToDisappear(this.welcomeModalHeaderSelector);
    }

    async resetShippingCountryToUS() {
        await BrowserActions.scrollToPageBottom();
        if (!await BrowserActions.isBrowserSafari()) {
            await BrowserActions.clickOnElement(this.changeCountryLinkSelector);
        } else {
            await BrowserActions.clickOnElementMobile(this.changeCountryLinkSelector);
        }
        await BrowserActions.clickOnElement(this.resetShippingCountryLinkSelector);
        await BrowserActions.clickOnElement(this.saveShippingPreferencesButtonSelector);
        await BrowserActions.waitForElementToDisappear(this.internationalShippingModalHeader);
    }

    async navigateToProductCategory(category, subcategory) {
        await BrowserActions.clickOnElement(`button=${category}`);
        let subcategorySelector = "";

        switch (subcategory.toLowerCase()) {
            case "jewelry":
                subcategorySelector = "a[href^='/browse/women/jewelry'],a[href^='/shop/women/jewelry']";
                break;
            case "shoes":
                subcategorySelector = "a[href^='/browse/women/shoes'],a[href^='/shop/Women/Shoes']";
                break;
            case "dresses":
                subcategorySelector = "a[href^='/browse/women/clothing/dresses'],a[href^='/shop/Women/Clothing/Dresses']";
                break;
            default:
                // eslint-disable-next-line max-len
                throw new Error(`Unable to navigate to ${category} => ${subcategory}: "${subcategory}" is not a known subcategory`);
        }

        await BrowserActions.clickOnElement(subcategorySelector);
    }

    async openMainMenuMobile() {
        try {
            for (let i = 0; i < 10; i++) {
                await BrowserActions.clickOnElementMobile(this.hamburgerMenu);
            }
        } catch (error) {
            console.log("Hamburger menu already open.");
        }
    }

    async getHamburgerMenuCategories() {
        return await BrowserActions.getTextFromMultipleSelectors(this.hamburgerMenuCategories);
    }

    async navigateToProductCategoryMobile() {
        await this.openMainMenuMobile();

        let menuPath = "";

        const topMenuCategoriesLen = await BrowserActions.getElementCount(this.hamburgerMenuCategories);
        let randomCategoryNumber = Math.floor(Math.random() * (topMenuCategoriesLen - 1) + 1);
        const topMenuCategoriesSeclector = `#global-nav-mobile-primary > ul > li:nth-child(${randomCategoryNumber}) > a`;
        await BrowserActions.scrollToElement(topMenuCategoriesSeclector);
        const topMenuText = await $(topMenuCategoriesSeclector).getText();
        // console.log(`Clicking ${topMenuText}`);
        await (await $(topMenuCategoriesSeclector)).click();
        await BrowserActions.pauseExecution(500);

        await $(this.mobileSecondaryNav);

        const subMenuCategoriesLen = await BrowserActions.getElementCount(this.mobileSecondaryNavSubCategories);

        randomCategoryNumber = Math.floor(Math.random() * (subMenuCategoriesLen - 1) + 1);
        let subMenuCategoriesSeclector = `#global-nav-mobile-secondary > ul > li:nth-child(${randomCategoryNumber})`;
        const subMenuCategoryRole = await $(subMenuCategoriesSeclector).getAttribute("role");

        const subMenuCategoriesText = await $(subMenuCategoriesSeclector).getText();
        // console.log(`Clicking ${subMenuCategoriesText}`);
        menuPath += `${topMenuText} -> ${subMenuCategoriesText} `;

        if (subMenuCategoryRole !== null) {
            const subMenuCategoriesButton = await $(subMenuCategoriesSeclector + " > button");
            await subMenuCategoriesButton.scrollIntoView();
            await subMenuCategoriesButton.click();
            await BrowserActions.pauseExecution(500);

            const subSubMenuCategories = subMenuCategoriesSeclector + " ul > li";
            const categories = await $$(subSubMenuCategories);
            randomCategoryNumber = Math.floor(Math.random() * (categories.length - 1) + 1);
            const subSubMenuCategoryText = await categories[randomCategoryNumber].getText();
            menuPath += ` -> ${subSubMenuCategoryText}`;
            // console.log(`Clicking ${subSubMenuCategoryText}`);
            await categories[randomCategoryNumber].scrollIntoView();
            await (await categories[randomCategoryNumber].$(".//a")).click();
        } else {
            await BrowserActions.scrollToElement(subMenuCategoriesSeclector);
            subMenuCategoriesSeclector += " > a";
            await (await $(subMenuCategoriesSeclector)).click();
        }

        menuPath = menuPath.replace(/\n/g, " ");
        console.log(`Navigating to ${menuPath}`);
    }

    async navigateToMyAccountPage(email, password) {
        await BrowserActions.mouseOverElement(this.signInLinkSelector);
        await BrowserActions.clickOnElement(this.yourAccountLinkSelector);

        const needToSignIn = await this.hasBeenRedirectedToSignIn();

        if (needToSignIn) {
            await this.signIn(email, password, {
                navigateToSignInPage: false
            });
        }
    }

    async scrollThroughRecShelf() {
        const ANIMATION_PAUSE_TIME = 1000;
        const isSafari = await BrowserActions.isBrowserSafari();

        await BrowserActions.scrollToPageBottom();
        await BrowserActions.waitForElementToAppear(this.recShelfContainerSelector);

        // Test is not stable in Safari
        if (!isSafari) {
            await BrowserActions.scrollToElement(this.recShelfRightArrowSelector);
            await BrowserActions.pauseExecution(ANIMATION_PAUSE_TIME);
            await BrowserActions.clickOnElement(this.recShelfRightArrowSelector);
            await BrowserActions.pauseExecution(ANIMATION_PAUSE_TIME);
            await BrowserActions.clickOnElement(this.recShelfLeftArrowSelector);
        }
    }

    async performSearch(searchTerm) {
        await BrowserActions.clickOnElementMobile(this.searchInputSelector);
        await BrowserActions.setTextOnElement(this.searchInputSelector, searchTerm);
        await BrowserActions.pressKeys(["Meta", "Enter"]);
    }

    async enterPartOfSearchTerm(searchTerm) {
        await BrowserActions.setTextOnElement(this.searchInputSelector, searchTerm);
    }

    async performSearchMobile(searchTerm) {
        await BrowserActions.pauseExecution(1000);
        for (let i = 0; i < 10; i++) {
            if (!await BrowserActions.isElementDisplayed(this.searchInputSelector)) {
                await BrowserActions.clickOnElementMobile(this.searchInputSelectorMobile);
                await BrowserActions.pauseExecution(1000);
            } else {
                break;
            }
        }
        const isIPhone = await BrowserActions.isDeviceIPhone();
        await BrowserActions.pauseExecution(1000);
        await BrowserActions.setTextOnElement(this.searchInputSelector, searchTerm);
        await BrowserActions.setTextOnElement(this.searchInputSelector, "\n");
        if (!isIPhone) {
            await browser.pressKeyCode(66);
        }
    }

    async enterPartOfSearchTermMobile(searchTerm) {
        if (await BrowserActions.isElementDisplayed(this.searchInputSelectorMobile)) {
            await BrowserActions.clickOnElementMobile(this.searchInputSelectorMobile);
        }
        await BrowserActions.pauseExecution(500);
        await BrowserActions.setTextOnElement(this.searchInputSelector, searchTerm);
    }

    async clearSearchInput() {
        await BrowserActions.clickOnElement(this.clearSearchForm);
    }

    async clickOnSearchInput() {
        await BrowserActions.clickOnElement(this.searchInputSelector);
    }

    async clearSearchInputMobile() {
        await this.openSearchInputMobile();
        const isIPhone = await BrowserActions.isDeviceIPhone();
        if (isIPhone) {
            await BrowserActions.clickOnElementMobile(this.clearSearchFormMobile);
            await BrowserActions.clickOnElementMobile(this.searchInputSelector);
        } else {
            await BrowserActions.clickOnElementMobile(this.clearSearchFormMobile);
            await BrowserActions.clickOnElementMobile(this.searchInputSelector);
        }
    }

    async openSearchInputMobile() {
        if (await BrowserActions.isElementDisplayed(this.searchFormMobile)) {
            await BrowserActions.clickOnElementMobile(this.searchFormMobile);
        }
    }

    async getRecentSearchesHead() {
        await BrowserActions.clickOnElement(this.searchInputSelector);
        return await BrowserActions.getTextFromSelector(this.recentSearches);
    }

    async clickRecentSearchesHead() {
        browser.refresh();
        await BrowserActions.clickOnElement(this.searchInputSelector);
        await BrowserActions.clickOnElement(this.recentSearches);
    }

    async getRecentSearches() {
        await BrowserActions.clickOnElement(this.searchInputSelector);
        return await BrowserActions.getTextFromMultipleSelectors(this.recentSearches);
    }

    async getRecentSearchesHeadMobile() {
        await BrowserActions.clickOnElementMobile(this.searchInputSelector);
        return await BrowserActions.getTextFromSelector(this.recentSearchesMobile);
    }

    async clickRecentSearchesHeadMobile() {
        await BrowserActions.pauseExecution(1000);
        await BrowserActions.waitForElement(this.searchInputSelectorMobile);
        if (await BrowserActions.isElementDisplayed(this.searchInputSelectorMobile)) {
            await BrowserActions.clickOnElementMobile(this.searchInputSelectorMobile);
        }
        return await BrowserActions.clickOnElementMobile(this.recentSearchesMobile);
    }

    async getRecentSearchesMobile() {
        return await BrowserActions.getTextFromMultipleSelectors(this.recentSearchesMobile);
    }

    async getSearchInputText() {
        return await BrowserActions.getAttributeFromSelector(this.searchInputSelector, "placeholder");
    }

    async switchToTab(tab) {
        return await BrowserActions.switchToTab(tab);
    }

    async isSignInDisplayed() {
        return await BrowserActions.isElementDisplayed((this.signInButtonSelectorMobile));
    }
}
