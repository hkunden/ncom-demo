/* global $ */
import BrowserActions from "../browser-actions";
import Page from "./page";
import Helpers from "../helpers";

export default class SearchResultsPage extends Page {
    constructor(...args) {
        super(...args);

        this.searchResultSelector = "[name='product-module-image']";
        this.searchResultSelectorMobile = "[Alt='Product Image']";
        this.sortDropdownSelector = "[name='sort']";
        this.sortDropdownSelectorMobile = "select[name*='sort']";
        this.noResultsMessageSelector = "h1*=No results for";
        this.chatWithUsLink = "a=Chat with us";
        this.phoneNumber = "li*=Call ";
        this.brandOrDesignerLink = "[title='Brands']";
        this.bredcrumbForHomepage = "[href='/']";
        this.bredcrumbForWomen = "[href='/browse/women']";
        this.bredcrumbForWomenRack = "[href='/category/Women']";
        this.bredcrumbForWomenClothing = "[href='/browse/women/clothing']";
        this.bredcrumbForWomenClothingRack = "[href='/shop/Women/Clothing']";
        this.totalItemsCounter = "//header/nav/div/span";
        this.totalItemsCounterMobile = "//header/div/div/div";
        this.productResultsAnchor = "//*[@id='product-results-query-anchor']/following-sibling::h1";
        this.productResultsAnchorMobile = "//*[@id='product-results-view']//header//h1";
        this.giftCardBuyNow = "//*[contains(text(),'Buy Now')]";
        this.giftCardRecipientInput = "#recipientName-input";
        this.giftCardSenderName = "#senderName-input";
        this.searchResultsNumber = "#product-results-view > div section > header > nav > div > span";
        this.setLocation = "//*[text()='Set location']";
        this.zipCodeInput = "//*[@name='postalCode']";
        this.zipCodeSearch = "//*[@type='submit']";
        this.zipCodeSearchMobile = "#dialog-description section button";
        this.bopusListOfStores = "//*[@id='dialog-description']//fieldset/label/div";
        this.bopusSetYourStoreButton = "//*[@id='dialog-description']/div/div/button[1]";
        this.bopusPickUpTomorrow = "//*[@id='pick-up-tomorrow-filter-option']";
        this.bopusPickUpToday = "//*[@id='pick-up-today-filter-option']/span";
        this.pickUpMessage = "//button[contains(text(),'Available ')]";
        this.bopusProductResultNumber = "//*[@id='product-results-view']//nav/div[1]/span";
        this.bopusProductResultNumberMobile = "//*[contains(text(),'results ')]";
        this.storeModeMenu = "#store-mode-button";
        this.setLocationMobile = "#filter-pickup-panel > div > button";
        this.doneButton = "//*[contains(text(),'Done')]";
        this.SEOContentBlock = "//*[contains(text(),'About Women')]";
        this.pageButtons = "a[href^='?page=']";
        this.previousAndNextButtonSelector = "//footer/ul/li/a";
        this.previousAndNextButtonSelectorMobile = "//footer/div/ul/li/a";
        this.nextButtonSelector = "//footer/ul/li/a/span";
        this.nextButtonSelectorMobile = "//footer/div/ul/li/a/span";
        this.checkBalanceButton = "//*[@aria-label='Check Balance']";
        this.giftCardBalanceTitle = "//*[@id='layer-0']//h2/span";
        this.allBreadcrumbs = "//*[@itemprop='itemListElement']";
        this.learnMoreButton = "//*[@aria-label='Learn More']";
        this.corporateGiftCardsPageBanner = "[alt='Corporate Gift Cards.']";
        this.defaultSorting = "//*[contains(@value,'Featured')]";
        this.colorCarousel = "#product-results-view section article ul";
        this.productModule = "#product-results-view section article";
        this.productModuleImage = "//img[@name='product-module-image']";
        this.brandFilterLink =
            "//*[@id='product-results-view']/div/div[1]/div/div/div/div[1]/div/div/div/div/div[4]/a/span[2]/span";
        this.findBrandField = "[title='Find a brand']";
        this.categories = "//*[@id='product-results-view']//header//ul/li";
        this.plusSignButton = "//article/ul/li[4]/a";
        this.GWPBrands = "//li/a/span/span";
        this.searchResultSelectorForGWPItems = "//*[contains(text(),'Gift with Purchase')]";
        this.searchSuggestions = "//*[@id='keyword-search-suggestion-0']/span/b";
        this.searchSuggestionsMobile = "#search-suggestions > li:nth-child(1)";
    }

    async searchForItemUsingRequest(item) {
        if (!await BrowserActions.isSiteRack(global.baseUrl)) {
            await super.open(`sr?origin=keywordsearch&keyword=${item}`);
        } else {
            await super.open(`search?origin=keywordsearch&keyword=${item}`);
        }
    }

    async goToItemByIDUsingRequest(id) {
        await super.open(`s/-/${id}`);
    }

    async getSearchResultCount() {
        return await BrowserActions.getElementCount(this.searchResultSelector);
    }

    async getSearchResultCountMobile() {
        return await BrowserActions.getElementCount(this.searchResultSelectorMobile);
    }

    async sortSearchResultsBy(value) {
        await BrowserActions.selectDropdownOptionByValue(this.sortDropdownSelector, value);
        await BrowserActions.pauseExecution(2000);
    }

    async sortSearchResultsByMobile(value) {
        await BrowserActions.selectDropdownOptionByValueMobile(this.sortDropdownSelectorMobile, value);
        await BrowserActions.pauseExecution(2000);
    }

    async getNoResultsMessageText() {
        return await BrowserActions.getTextFromSelector(this.noResultsMessageSelector);
    }

    async getPhoneNumberText() {
        return await BrowserActions.getTextFromSelector(this.phoneNumber);
    }

    async clickOnChatWithUsLink() {
        await BrowserActions.clickOnElement(this.chatWithUsLink);
    }

    async clickOnChatWithUsLinkMobile() {
        await BrowserActions.clickOnElementMobile(this.chatWithUsLink);
    }

    async checkForNullResultsMessage() {
        await BrowserActions.waitForElementToAppear(this.noResultsMessageSelector);
    }

    async clickOnBrandOrDesignerLink() {
        await BrowserActions.clickOnElement(this.brandOrDesignerLink);
    }

    async clickOnBrandOrDesignerLinkMobile() {
        await BrowserActions.clickOnElementMobile(this.brandOrDesignerLink);
    }

    async checkForHomepageBreadcrumb() {
        await BrowserActions.waitForElementToAppear(this.bredcrumbForHomepage);
    }

    async checkForWomenBreadcrumb() {
        await BrowserActions.waitForElementToAppear(this.bredcrumbForWomen);
    }

    async clickOnWomenBreadcrumb() {
        await BrowserActions.clickOnElement(this.bredcrumbForWomen);
    }

    async checkForWomenBreadcrumbRack() {
        await BrowserActions.waitForElementToAppear(this.bredcrumbForWomenRack);
    }

    async clickOnWomenBreadcrumbRack() {
        await BrowserActions.clickOnElement(this.bredcrumbForWomenRack);
    }

    async checkForWomenClothingBreadcrumb() {
        await BrowserActions.waitForElementToAppear(this.bredcrumbForWomenClothing);
    }

    async clickOnWomenClothingBreadcrumb() {
        await BrowserActions.clickOnElement(this.bredcrumbForWomenClothing);
    }

    async checkForWomenClothingBreadcrumbRack() {
        await BrowserActions.waitForElementToAppear(this.bredcrumbForWomenClothingRack);
    }

    async clickOnWomenClothingBreadcrumbRack() {
        await BrowserActions.clickOnElement(this.bredcrumbForWomenClothingRack);
    }

    async getTotalItemsCounter() {
        return await BrowserActions.getTextFromSelector(this.totalItemsCounter);
    }

    async getTotalItemsCounterMobile() {
        return await BrowserActions.getTextFromSelector(this.totalItemsCounterMobile);
    }

    async getProductResultsAnchor() {
        return await BrowserActions.getTextFromSelector(this.productResultsAnchor);
    }

    async getProductResultsAnchorMobile() {
        return await BrowserActions.getTextFromSelector(this.productResultsAnchorMobile);
    }

    async clickGiftCardBuyNow() {
        await BrowserActions.clickOnElement(this.giftCardBuyNow);
    }

    async getGiftCardRecipientInput() {
        return await BrowserActions.isElementDisplayed(this.giftCardRecipientInput);
    }

    async getGiftCardSenderName() {
        return await BrowserActions.isElementDisplayed(this.giftCardSenderName);
    }

    async getSearchResultsNumber() {
        return await BrowserActions.getTextFromSelector(this.searchResultsNumber);
    }

    async clickSetLocation() {
        await BrowserActions.clickOnElement(this.setLocation);
    }

    async setZipcode(text) {
        await BrowserActions.setTextOnElement(this.zipCodeInput, text);
    }

    async clickSearchZipcode() {
        await BrowserActions.clickOnElement(this.zipCodeSearch);
    }

    async clickSearchZipcodeMobile() {
        await BrowserActions.clickOnElementUsingScript(this.zipCodeSearchMobile);
    }

    async getBopusListOfStores() {
        return await BrowserActions.getTextFromMultipleSelectors(this.bopusListOfStores);
    }

    async clickSetYourStore() {
        await BrowserActions.clickOnElement(this.bopusSetYourStoreButton);
    }

    async clickSetYourStoreMobile() {
        await BrowserActions.clickOnElementUsingScript(this.bopusSetYourStoreButton);
    }

    async clickPickUpTomorrowOption() {
        await BrowserActions.clickOnElement(this.bopusPickUpTomorrow);
    }

    async clickPickUpTodayOption() {
        await BrowserActions.clickOnElement(this.bopusPickUpToday);
    }

    async clickPickUpTodayOptionMobile() {
        await BrowserActions.clickOnElementUsingScript(this.bopusPickUpToday);
    }

    async isPickUpTodayOptionDisplayed() {
        return await BrowserActions.isElementDisplayed(this.bopusPickUpToday);
    }

    async getPickUpText() {
        return await BrowserActions.getTextFromMultipleSelectors(this.pickUpMessage);
    }

    async getAvailableItemsNumber() {
        return await BrowserActions.getTextFromSelector(this.bopusProductResultNumber);
    }

    async getAvailableItemsNumberMobile() {
        return await BrowserActions.getTextFromSelector(this.bopusProductResultNumberMobile);
    }

    async clickStoreMode() {
        await BrowserActions.clickOnElementUsingScript(this.storeModeMenu);
    }

    async clickSetLocationMobile() {
        await BrowserActions.clickOnElementUsingScript(this.setLocationMobile);
    }

    async clickDoneButton() {
        await BrowserActions.clickOnElementUsingScript(this.doneButton);
    }

    async waitForSEOContentBlock() {
        await BrowserActions.waitForElementToAppear(this.SEOContentBlock);
    }

    async clickOnSEOContentBlock() {
        await BrowserActions.clickOnElementUsingScript(this.SEOContentBlock);
    }

    async clickOnSEOContentBlockMobile() {
        await BrowserActions.clickOnElementMobile(this.SEOContentBlock);
    }

    async checkForSEOContentBlock() {
        await BrowserActions.isElementDisplayed(this.SEOContentBlock);
    }

    async getPageOfSearchResultsByIndex(index) {
        return await BrowserActions.clickOnElementByIndex(this.pageButtons, index);
    }

    async getPageOfSearchResultsByIndexMobile(index) {
        return await BrowserActions.clickOnElementByIndexMobile(this.pageButtons, index);
    }

    async clickOnPreviousOrNextButton(index) {
        return await BrowserActions.clickOnElementByIndex(this.previousAndNextButtonSelector, index);
    }

    async clickOnPreviousOrNextButtonMobile(index) {
        return await BrowserActions.clickOnElementByIndexMobile(this.previousAndNextButtonSelectorMobile, index);
    }

    async clickOnCheckBalance() {
        return await BrowserActions.clickOnElement(this.checkBalanceButton);
    }

    async getURLFromCheckBalanceButton() {
        return await BrowserActions.getAttributeFromSelector(this.checkBalanceButton, "href");
    }

    async getGiftCardBalanceTitle() {
        return await BrowserActions.getTextFromSelector(this.giftCardBalanceTitle);
    }

    async getListOfBreadcrumb() {
        return await BrowserActions.getTextFromMultipleSelectors(this.allBreadcrumbs);
    }

    async clickOnLearnMore() {
        return await BrowserActions.clickOnElement(this.learnMoreButton);
    }

    async checkCorporateGiftCardBanner() {
        await BrowserActions.isElementDisplayed(this.corporateGiftCardsPageBanner);
    }

    async getURLFromLearnMoreButtonButton() {
        return await BrowserActions.getAttributeFromSelector(this.learnMoreButton, "href");
    }

    async getDefaultSorting() {
        return await BrowserActions.getTextFromSelector(this.defaultSorting);
    }

    async clickOnBrandFilter() {
        await BrowserActions.clickOnElement(this.brandFilterLink);
    }

    async waitForBrandTextFilter() {
        await BrowserActions.waitForElementToAppear(this.findBrandField);
    }

    async clickOnBrandTextFilter() {
        await BrowserActions.clickOnElement(this.findBrandField);
    }

    async searchInBrandsFieldAndApplyFirst(searchTerm) {
        await BrowserActions.setTextOnElement(this.findBrandField, searchTerm);
        await BrowserActions.pressKeys(["Meta", "Enter"]);
    }

    async getColorCarouselCount() {
        return await BrowserActions.getElementCount(this.colorCarousel);
    }

    async getProductColourCarouselLocator(index) {
        return `#product-results-view section article:nth-child(${index}) li button`;
    }

    async getRandomProductModuleIndex() {
        let randomIndex = -1;
        for (let i = 0; i < 30; i++) {
            const index = await Helpers.getRandomNumber(1, await BrowserActions.getElementCount(this.productModule));
            if (await BrowserActions.getElementCount(
                await this.getProductColourCarouselLocator(index + 1)) > 4) {
                randomIndex = index;
                break;
            }
        }
        return randomIndex;
    }

    async getProductModuleImagesSrc(index) {
        return await BrowserActions.getAttributeFromSelectorByIndex(this.productModuleImage, "src", index);
    }

    async clickRandomColourOnProductByIndex(index) {
        index = index + 1;
        const coloursCount = await BrowserActions.getElementCount(await this.getProductColourCarouselLocator(index));
        const randomColourIndex = await Helpers.getRandomNumber(1, coloursCount - 1);
        await BrowserActions.scrollToElement(await this.getProductColourCarouselLocator(index));
        await BrowserActions.scrollByPx(2, -200);
        await BrowserActions.clickOnElementByIndex(
            await this.getProductColourCarouselLocator(index), randomColourIndex);
    }

    async hoverOnRandomColourOnProductByIndex(index) {
        index = index + 1;
        await BrowserActions.mouseOverElement(await this.getProductColourCarouselLocator(index));
    }

    async getCategoriesCount() {
        return await BrowserActions.getElementCount(this.categories);
    }

    async clickOnPlusSignButton() {
        await BrowserActions.scrollToElement(this.plusSignButton);
        await BrowserActions.clickOnElementMobile(this.plusSignButton);
    }

    async clickOnRandomGWPBrandByIndex() {
        function getRandomIntInclusive(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1) + min);
        }

        const index = getRandomIntInclusive(4, 8);
        await BrowserActions.scrollToElementByIndex(this.GWPBrands, index);
        return await BrowserActions.clickOnElementByIndex(this.GWPBrands, index);
    }

    async getSearchResultCountGWP() {
        return await BrowserActions.getElementCount(this.searchResultSelectorForGWPItems);
    }

    async clickOnRandomGWPBrandByIndexMobile() {
        function getRandomIntInclusive(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1) + min);
        }

        const index = getRandomIntInclusive(4, 20);
        return await BrowserActions.getRandomGWPBrandTitle(this.GWPBrands, index);
    }

    async checkForSearchSuggestion() {
        await BrowserActions.pauseExecution(2000);
        await BrowserActions.waitForElementToAppear(this.searchSuggestions);
    }

    async checkForSearchSuggestionMobile() {
        await BrowserActions.pauseExecution(2000);
        await BrowserActions.waitForElementToAppear(this.searchSuggestionsMobile);
    }

    async clickForSearchSuggestion() {
        await BrowserActions.clickOnElement(this.searchSuggestions);
    }

    async clickForSearchSuggestionMobile() {
        await BrowserActions.clickOnElementMobile(this.searchSuggestionsMobile);
    }
}
