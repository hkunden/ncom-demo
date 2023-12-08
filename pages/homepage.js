/* global $, $$, browser */
import BrowserActions from "../browser-actions";
import Page from "./page";
import _ from "lodash";

export default class Homepage extends Page {
    constructor(...args) {
        super(...args);

        this.headerLogoSelector = "figure[aria-label$='Logo']";
        this.topMenuCategories = "//*[@id='global-header-desktop']//nav/div/ul/li";
        this.nordstromLogo = "//a[@aria-label='Nordstrom Logo']";
        this.nordstromrackLogo = "//a[@aria-label='Nordstrom Rack Logo']";
        this.nordstromLogoMobile = "//a[@id='logo']";
        this.giftCardsLinkNCOM = "//a[@aria-label='Gift Cards']/parent::li//*[contains(@href,'shop.giftcard')]";
        this.giftCardsLinkRACK = "//*[@id='layer-0']//*[text()='Gift Cards']";
        this.recipientNameInput = "#recipientName-input";
        this.senderNameInput = "#senderName-input";
        this.contactUs = "//*[@id='global-nav-mobile-primary']/div/p";
        this.customerServiceLinkMobile = "//*[@element='support-and-legal']//*[contains(text(),'Customer Service')]";
        this.giftCardsLinkMobileNCOM = "//*[@element='support-and-legal']//*[contains(text(),'Gift Cards')]";
        this.topNavSale = "//*[@id='global-header-desktop']//*[text()='Sale']";
        this.topNavLimitedTimeSale = "//*[@id='GlobalDesktopNavFlyout']//*[text()='Limited-Time Sale']";
        this.topNavSaleMobile = "//*[contains(@href,'/browse/sale')]";
        this.topNavFeaturedMobile = "//*[@id='global-nav-mobile-secondary']/ul/li[2]/button/span[2]";
        this.topNavLimitedTimeSaleMobile = "//*[@id='global-nav-mobile-secondary']//*[text()='Limited-Time Sale']";
        this.keywordSearchInput = "#keyword-search-desktop";
        this.closeOriginMenuButton = "//*[contains(@id,'layer-')]//button[contains(text(),'×')]";
        this.yourThoughtsPopup = "//*[@id='acsFocusFirst']";
        this.goToHomePage = "//*[contains(text(),'Go to Homepage')]";
        this.anniversarySaleMenu = "#flyout-anchor-index-control-1";
        this.anniversarySaleMenuOptions = "//*[@id='GlobalDesktopNavFlyout']//li//a";
        this.itemsInMiniBag = "//*[@id='shopping-bag-popover']//ul/li";
        this.itemsInMiniBagInfo = "//*[@id='shopping-bag-popover']//li//div/a";
        this.itemsInMiniBagPrice = "//*[@id='shopping-bag-popover']//li//div//*[contains(text(),'$')]";
        this.wishlistHref = "//*[@id='global-nav-mobile-primary']//*[contains(@href,'/my-account/wishlist')]";
        this.holidayTopText = "//*[@id='layer-1']/section//span/p";
        this.holidayTopTextMobile = "//*[@id='layer-4']/div/div/div/div/p";
        this.getAppBanner = "//*[@id='branch-banner-iframe']";
        this.closeGetAppBanner = "//*[contains(@id,'branch-banner-close1')]";
        this.firstMenuElement = "//*[@id='flyout-anchor-index-control-0']";
        this.topNavHolidayMobile = "//*[contains(@href,'/browse/holiday-gifts')]";
        this.giftsForHer = "//*[contains(text(),'Gifts for Her')]";
        this.giftsForHim = "//*[contains(text(),'Gifts for Him')]";
        this.giftsByRecipient = "//*[contains(text(),'Gifts by Recipient')]";
    }

    async open() {
        await super.open("", false);
    }

    async setDefaultExperiments() {
        await super.open("", false);
        await super.open("configure?experimentId=CATB", false);
        await BrowserActions.waitForElementToAppear(this.goToHomePage);
        await BrowserActions.pauseExecution(1000);
        await super.open("");
    }

    async setRunAsOfDate(date) {
        await super.open(`configure?runAsOf=${date}`);
        await BrowserActions.pauseExecution(1000);
        await BrowserActions.waitForElementToAppear(this.goToHomePage);
        await BrowserActions.pauseExecution(1000);
    }

    async clickCloseGetAppBanner() {
        await BrowserActions.pauseExecution(1000);
        try {
            if (await BrowserActions.isDeviceAndroid() || await BrowserActions.isDeviceIPhone()) {
                await BrowserActions.pauseExecution(1500);
                if (await BrowserActions.isElementDisplayed(this.getAppBanner)) {
                    await BrowserActions.switchToIFrame(this.getAppBanner);
                    if (await BrowserActions.isElementDisplayed(this.closeGetAppBanner)) {
                        await BrowserActions.clickOnElementMobile(this.closeGetAppBanner);
                    }
                }
            }
        } catch (ex) {
            console.log(ex);
        }
        await BrowserActions.pauseExecution(500);
    }

    async checkForCoreComponents() {
        await BrowserActions.waitForElementToAppear(this.headerLogoSelector);
    }

    async getTopMenuCategories() {
        return await BrowserActions.getTextFromMultipleSelectors(this.topMenuCategories);
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

    async clickGiftCardsLinkNCOM() {
        for (let i = 0; i < 10; i++) {
            await BrowserActions.scrollByPx(10, 100);
            const isDisplayed = await BrowserActions.isDisplayedInViewport(this.giftCardsLinkNCOM);
            if (isDisplayed) {
                break;
            }
        }
        if (!await BrowserActions.isBrowserSafari()) {
            await BrowserActions.clickOnElement(this.giftCardsLinkNCOM);
        } else {
            await BrowserActions.clickOnElementMobile(this.giftCardsLinkNCOM);
        }
    }

    async clickGiftCardsLinkRACK() {
        for (let i = 0; i < 10; i++) {
            await BrowserActions.scrollByPx(10, 100);
            const isDisplayed = await BrowserActions.isDisplayedInViewport(this.giftCardsLinkRACK);
            if (isDisplayed) {
                break;
            }
        }
        if (!await BrowserActions.isBrowserSafari()) {
            await BrowserActions.clickOnElement(this.giftCardsLinkRACK);
        } else {
            await BrowserActions.clickOnElementMobile(this.giftCardsLinkRACK);
        }
    }

    async isRecipientNameInputDisplayed() {
        await BrowserActions.waitForElementToAppear(this.recipientNameInput);
        return await BrowserActions.isElementDisplayed(this.recipientNameInput);
    }

    async isSenderNameInputDisplayed() {
        await BrowserActions.waitForElementToAppear(this.senderNameInput);
        return await BrowserActions.isElementDisplayed(this.senderNameInput);
    }

    async clickCustomerServiceLinkMobile() {
        await BrowserActions.scrollToPageBottom();
        await BrowserActions.scrollToElement(this.contactUs);
        if (await BrowserActions.isDeviceIPhone() === true) {
            await BrowserActions.clickOnElementMobile(this.customerServiceLinkMobile);
        } else {
            await BrowserActions.pauseExecution(3000);
            await BrowserActions.clickOnElementMobile(this.customerServiceLinkMobile);
        }
    }

    async clickGiftCardsLinkMobileNCOM() {
        if (await BrowserActions.isDeviceIPhone() === true) {
            await BrowserActions.pauseExecution(3000);
            await BrowserActions.clickOnElementMobile(this.giftCardsLinkMobileNCOM);
        } else {
            await BrowserActions.pauseExecution(3000);
            await BrowserActions.clickOnElementMobile(this.giftCardsLinkMobileNCOM);
        }
    }

    async clickTopNavSaleLink() {
        await BrowserActions.clickOnElement(this.topNavSale);
    }

    async clickTopNavLimitedTimeSaleLink() {
        await BrowserActions.clickOnElement(this.topNavLimitedTimeSale);
    }

    async clickTopNavSaleMobile() {
        await BrowserActions.clickOnElementMobile(this.topNavSaleMobile);
    }

    async clickTopNavFeaturedMobile() {
        await BrowserActions.clickOnElementMobile(this.topNavFeaturedMobile);
    }

    async clickTopNavLimitedTimeSaleLinkMobile() {
        await BrowserActions.clickOnElementMobile(this.topNavLimitedTimeSaleMobile);
    }

    async clickKeywordSearchInput() {
        if (!await BrowserActions.isBrowserSafari()) {
            await BrowserActions.clickOnElement(this.keywordSearchInput);
        } else {
            await BrowserActions.clickOnElementMobile(this.keywordSearchInput);
        }
    }

    async clickCloseOriginMenuButton() {
        await BrowserActions.pauseExecution(1000);
        if (await BrowserActions.isElementDisplayed(this.closeOriginMenuButton)) {
            await BrowserActions.clickOnElementMobile(this.closeOriginMenuButton);
        }
    }

    async clickCloseYourThoughtsPopup() {
        await BrowserActions.pauseExecution(1000);
        if (await BrowserActions.isElementDisplayed(this.yourThoughtsPopup)) {
            await BrowserActions.clickOnElementMobile(this.yourThoughtsPopup);
        }
    }

    async clickAnniversarySaleMenu() {
        await BrowserActions.clickOnElement(this.anniversarySaleMenu);
    }

    async clickRandomAnniversarySaleMenuOption() {
        await BrowserActions.clickOnRandomElement(this.anniversarySaleMenuOptions);
    }

    async getItemsInMinibagCount() {
        return await BrowserActions.getElementCount(this.itemsInMiniBag);
    }

    async getItemsInMinibagInfo() {
        const info = await BrowserActions.getTextFromMultipleSelectors(this.itemsInMiniBagInfo);
        return _.compact(await Promise.all(
            _.filter(info, async (element) => element.length > 0)));

    }

    async getItemsInMinibagPrices() {
        return await BrowserActions.getTextFromMultipleSelectors(this.itemsInMiniBagPrice);
    }

    async clickOnWishList() {
        await BrowserActions.clickOnElementMobile(this.wishlistHref);
    }

    async getHolidayTopText() {
        return await BrowserActions.getTextFromSelector(this.holidayTopText);
    }

    async getHolidayTopTextMobile() {
        return await BrowserActions.getTextFromSelector(this.holidayTopTextMobile);
    }

    async clickFirstMenuElement() {
        await BrowserActions.clickOnElementMobile(this.firstMenuElement);
    }

    async clickGiftsForHer() {
        await BrowserActions.clickOnElementMobile(this.giftsForHer);
    }

    async clickGiftsForHim() {
        await BrowserActions.clickOnElementMobile(this.giftsForHim);
    }

    async clickGiftsByRecipient() {
        await BrowserActions.clickOnElementMobile(this.giftsByRecipient);
    }

    async clickHolidayTopNav() {
        await BrowserActions.clickOnElementMobile(this.topNavHolidayMobile);
    }
}
