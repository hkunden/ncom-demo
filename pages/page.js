/* globals browser */
import {DEFAULT_ENVIRONMENT} from "../constants";
import BrowserActions from "../browser-actions";

export default class Page {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
        this.signInMenuSelector = "#controls-account-links > span";
        this.signInLinkSelector = "a[href*='/signin?cm_sp']";
        this.yourAccountLinkSelector = "a=Your Account";
        this.recShelfContainerSelector = "[id^='product-recommendations-shelf-']";
        this.recShelfRightArrowSelector = "[aria-label=\"next slide\"]";
        this.recShelfLeftArrowSelector = "[aria-label=\"previous slide\"]";
        this.recShelfProductSelector = `${this.recShelfContainerSelector} a[href^='/s/']`;
        this.searchInputSelector = "#keyword-search-input";
        this.searchInputSelectorMobile = "//*[@id='layer-4']//button/div";
        this.searchSuggestions = "#search-suggestions > li:nth-child(1)";
        this.emailFieldSelector = ("[name=\"email\"]");
        this.passwordFieldSelector = "[name=\"password\"]";
        this.nextButtonSelector = "#account-check-next-button";
        this.signInButtonSelector = "//*[@id=\"sign-in\"]/*/button[contains(@alt, \"sign in button\")]";
        this.internationalShippingModalHeader = "h3=We ship internationally";
        this.shippingCountryDropdownSelector = "#dialog-description label > select";
        this.changeCountryLinkSelector = "a[name='changeCountry'] > div";
        this.saveShippingPreferencesButtonSelector = "#dialog-description button";
        this.welcomeModalHeaderSelector = "h3*=We Ship to";
        this.resetShippingCountryLinkSelector = "a=ship to a U.S. address";
        this.closeModalLinkSelector = "a[href='#close-modal']";
        this.foreseeOptOutButton = "#acsOptOutButton";
        this.recentSearches = "//*[@id='keyword-search-popover']//section/ul/li/span";
        this.recentSearchesMobile = "//*[@id='layer-2']//section//ul/li/span";
        this.clearSearchForm = "//*[@aria-labelledby='reset-search-label']";
        this.clearSearchFormMobile = "//*[text()='Clear']";
        this.searchFormMobile = "//*[@href='#search']/*";
    }

    async open(path = "") {
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

        this.originalBrowserPath = this.baseUrl + "/" + path;

        await browser.url(this.originalBrowserPath);
        await browser.setCookies(cookies);

        if (refresh) {
            // We need to refresh the page so the server has a
            // chance to read the origin cookie
            await browser.refresh();
        }
    }

    async navigateToSignInPage() {
        await BrowserActions.mouseOverElement(this.signInMenuSelector);
        await BrowserActions.clickOnElement(this.signInLinkSelector);
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
        if (!await BrowserActions.isBrowserEdge()) {
            await BrowserActions.waitForElementToDisappear(this.signInButtonSelector);
        }

        // This is to get around a bug where the returnURL of the sign in link
        // doesn't get set right if the page is navigated to via hard-nav
        // TODO: Remove when the bug is fixed
        // https://jira.nordstrom.com/browse/SBX-3107

        if (!returnUrl && !skipReturnUrl) {
            await await browser.url(this.originalBrowserPath);
        }

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
                subcategorySelector = "a[href^='/browse/women/jewelry'],a[href^='/shop/Women/Jewelry']";
                break;
            default:
                // eslint-disable-next-line max-len
                throw new Error(`Unable to navigate to ${category} => ${subcategory}: "${subcategory}" is not a known subcategory`);
        }

        await BrowserActions.clickOnElement(subcategorySelector);
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
        await BrowserActions.setTextOnElement(this.searchInputSelector, searchTerm);
        await BrowserActions.pressKeys(["Meta", "Enter"]);
    }

    async enterPartOfSearchTerm(searchTerm) {
        await BrowserActions.setTextOnElement(this.searchInputSelector, searchTerm);
    }

    async performSearchMobile(searchTerm) {
        if (await BrowserActions.isElementDisplayed(this.searchInputSelectorMobile)) {
            await BrowserActions.clickOnElementMobile(this.searchInputSelectorMobile);
        }
        const isIPhone = await BrowserActions.isDeviceIPhone();
        await BrowserActions.setTextOnElement(this.searchInputSelector, searchTerm);
        await BrowserActions.setTextOnElement(this.searchInputSelector, "\n");
        if (isIPhone) {
            await BrowserActions.clickOnElementMobile(this.searchSuggestions);
        } else {
            await browser.pressKeyCode(66);
        }
    }

    async enterPartOfSearchTermMobile(searchTerm) {
        if (await BrowserActions.isElementDisplayed(this.searchInputSelectorMobile)) {
            await BrowserActions.clickOnElementMobile(this.searchInputSelectorMobile);
        }
        await BrowserActions.setTextOnElement(this.searchInputSelector, searchTerm);
    }

    async clearSearchInput() {
        await BrowserActions.clickOnElement(this.clearSearchForm);
    }

    async clearSearchInputMobile() {
        await this.openSearchInputMobile();
        const isIPhone = await BrowserActions.isDeviceIPhone();
        if (isIPhone) {
            await BrowserActions.touchElementByPoints(327, 88);
            await BrowserActions.clickOnElementMobile(this.clearSearchFormMobile);
            await BrowserActions.clickOnElementMobile(this.searchInputSelector);
        } else {
            await BrowserActions.touchElementByPoints(770, 300);
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
}
