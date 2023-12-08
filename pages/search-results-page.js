/* global $ */
import BrowserActions from "../browser-actions";
import Page from "./page";
import Helpers from "../helpers";
import {numberOfElementsToBeMoreThan} from "wdio-wait-for";

export default class SearchResultsPage extends Page {
    constructor(...args) {
        super(...args);

        this.counter = 0;
        this.searchResultSelector = "[name='product-module-image']";
        this.searchResultSelectorMobile = "article img";
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
        this.totalItemsCounter = "//*[@id='product-results-view']//section/header/nav/div/span";
        this.totalItemsCounterMobile = "//*[contains(text(),'results ')]";
        this.productResultsAnchor = "//*[@id='product-results-query-anchor']/following-sibling::h1";
        this.productResultsAnchorMobile = "//*[@id='product-results-view']//header//h1";
        this.giftCardBuyNow = "//*[contains(@aria-label,'Buy Now')]";
        this.giftCardRecipientInput = "#recipientName-input";
        this.giftCardSenderName = "#senderName-input";
        this.searchResultsNumber = "#product-results-view > div section > header > nav > div > span";
        this.setLocation = "//*[text()='Set location']";
        this.zipCodeInput = "//*[@name='postalCode']";
        this.zipCodeSearch = "//*[@id='dialog-description']//*[@type='submit']";
        this.zipCodeSearchMobile = "#dialog-description section button";
        this.bopusListOfStores = "//*[@id='dialog-description']//fieldset/label/div";
        this.bopusSetYourStoreButton = "//*[@id='dialog-description']/div/div/button[1]";
        this.bopusPickUpTomorrow = "//*[@id='pick-up-tomorrow-filter-option']";
        this.bopusPickUpToday = "//*[@id='pick-up-today-filter-option']/span";
        this.pickUpMessage = "//button[contains(text(),'Available ')]";
        this.bopusProductResultNumber = "//*[@id='product-results-view']//nav/div[1]/span";
        this.bopusProductResultNumberMobile = "//*[contains(text(),'results ')]";
        this.storeModeMenu = "#fulfillment";
        this.setLocationMobile = "#fulfillment-panel > div > button";
        this.doneButton = "//*[contains(text(),'Done')]";
        this.seoContentBlock = "//*[@id='product-results-view']//div/div/div/div/a/span/span";
        this.pageButtons = "a[href^='?page=']";
        this.previousAndNextButtonSelector = "//footer/ul/li/a";
        this.previousAndNextButtonSelectorMobile = "//*[@id='product-results-view']//section/footer/ul/li/a";
        this.nextButtonSelector = "//footer/ul/li/a/span";
        this.checkBalanceButton = "//*[@aria-label='Check Balance']";
        this.giftCardBalanceTitle = "//*[@id='layer-0']//h1/span";
        this.allBreadcrumbs = "//*[@itemprop='itemListElement']";
        this.learnMoreButtonRACK = "//*[contains(@href,'corporate-gc-program') and contains(@aria-label,'Learn More')]";
        this.learnMoreButtonNCOM = "//*[contains(@href,'corporate-gc-program')]";
        this.learnMoreButton = "//*[contains(@aria-label,'Learn More')]";
        this.corporateGiftCardsPageBanner = "[alt='Corporate Gift Cards.']";
        this.defaultSorting = "//*[contains(@value,'Featured')]";
        this.colorCarousel = "#product-results-view section article ul";
        this.productModule = "#product-results-view section article";
        this.productModuleImage = "//img[@name='product-module-image']";
        this.brandFilterLink = "#brand-heading";
        this.findBrandField = "[title='Find a brand']";
        this.categories = "//*[@id='product-results-view']//header//ul/li";
        this.plusSignButton = "//article/ul/li/a";
        this.gwpBrands = "//*[contains(@data-valuehierarchy,'standard-copy-set-0/text-link-0')]/span";
        this.searchResultSelectorForGWPItems = "//*[contains(text(),'Gift with Purchase')]";
        this.searchSuggestions = "//*[contains(@id, 'keyword-search-suggestion-')]/span";
        this.searchSuggestionsMobile = "#search-suggestions > li:nth-child(1)";
        this.itemOnSearchResults = "#product-results-view article h3 > a";
        this.itemsWithEnticement = "//*[contains(text(),'Arrives before Christmas')]/parent::article";
        this.itemsWith5Colours = "//*[@id='product-results-view']//article//ul/li[5]/ancestor::article//h3/a";
        this.itemsWith4Colours = "//*[@id='product-results-view']//article//ul/li[4]/ancestor::article/div/a";
        this.itemOnSearchResultsMobile = "//article/div/a";
        this.productResultsWithReviews = "//*[contains(@href,'#product-page-reviews')]";
        this.productResultsWithReviewsArticle = this.productResultsWithReviews + "/ancestor::article/div/a";
        this.allResults = "//article";
        this.umapProduct = "//*[contains(text(),'Add to Bag or Wish List to see price')]";
        this.umapProductMobile = "//*[contains(text(),'Add to Bag or Wish List to see price')]/parent::article/div/a";
        // eslint-disable-next-line max-len
        this.limitedTimeSaleItemMobile = "//*[@id='product-results-view']//*[text()='Limited-Time Sale']/parent::article/div/a";
        this.productResultsViewArticle = "//*[@id='product-results-view']//article";
        this.limitedTimesaleLebel = "//*[contains(text(),'Limited-Time Sale')]";
        this.anniversaryEarlyAccessLabel = "//span[contains(text(),'Anniversary Early Access')]";
        this.anniversarySaleLabel = "//*[@id='product-results-view']//article//*[contains(text(),'Anniversary Sale')]";
        this.beautyExclusiveLabel = "//*[@id='product-results-view']//article//*[contains(text(),'Beauty Exclusive')]";
        this.groomingExclusiveLabel = "//*[@id='product-results-view']//article//*[contains(text(),'Grooming Exclusive')]";
        this.homeCategory = "//*[contains(@href,'home?breadcrumb=Home%2FSale%2FLimited-Time%20Sale%2FHome')]";
        this.quickViewButton = "//*[contains(text(),'Quick View')]";
        this.sizeDropdownQV = "//*[@id='size-filter-sbn-anchor']";
        this.sizeOptionListQV = "#size-filter-sbn-option-list li";
        this.addToBagQV = "#sbn-add-to-bag-button";
        this.holidayEnticementQV = "#sbn-enticement-SOME_ARRIVES_BY_CHRISTMAS_EVE";
    }

    async searchForItemUsingRequest(item) {
        if (!await BrowserActions.isSiteRack(global.baseUrl)) {
            await super.open(`sr?origin=keywordsearch&keyword=${item}`);
        } else {
            await super.open(`search?origin=keywordsearch&keyword=${item}`);
        }
    }

    async searchForRandomItemFromFileUsingRequest(pathToFile) {
        await this.searchForItemUsingRequest(await Helpers.getRandomElement(
            await Helpers.asyncReadFile(pathToFile)));
    }

    async goToItemByIDUsingRequest(id) {
        await super.open(`s/-/${id}`);
    }

    async goToRandomItemFromFileByIDUsingRequest(pathToFile) {
        await this.goToItemByIDUsingRequest(await Helpers.getRandomElement(
            await Helpers.asyncReadFile(pathToFile)));
    }

    womenDressesRack = "shop/Women/Clothing/Dresses?breadcrumb=Home%2FWomen%2FClothing%2FDresses&origin=topnav";

    async goToWomenDressesSortHighToLow() {
        await super.open(this.womenDressesRack +
            "&sort=PriceHighToLow&filterByPrice=39-700");
    }

    async goToWomenDressesSortLowToHigh() {
        await super.open(this.womenDressesRack +
            "&sort=PriceLowToHigh&filterByPrice=0-25");
    }

    async goToWomenDressesWithPriceRange(min, max) {
        await super.open(this.womenDressesRack +
            `&filterByPrice=${min}-${max}`);
    }

    async goToHolidayDeals() {
        await super.open("c/holiday-deals-by-brand/longchamp-shop?" +
            "breadcrumb=Home%2FHoliday%20Deals%2FDeals%20by%20Brand%2FLongchamp%20From%20%2450&origin=topnav");
    }

    async getSearchResultCount() {
        await BrowserActions.waitForElementToAppear(this.searchResultSelector);
        return await BrowserActions.getElementCount(this.searchResultSelector);
    }

    async getSearchResultCountMobile() {
        await BrowserActions.pauseExecution(1000);
        return await BrowserActions.getElementCount(this.searchResultSelectorMobile);
    }

    async waitForSearchResultCountMoreThan(number) {
        await BrowserActions.pauseExecutionUntilConditionMet(numberOfElementsToBeMoreThan(
            this.searchResultSelectorMobile, number));
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
        await BrowserActions.waitForElement(this.totalItemsCounter);
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
        await BrowserActions.scrollToElement(this.giftCardBuyNow);
        if (!await BrowserActions.isBrowserSafari()) {
            await BrowserActions.clickOnElement(this.giftCardBuyNow);
        } else {
            await BrowserActions.clickOnElementMobile(this.giftCardBuyNow);
        }
    }

    async getGiftCardRecipientInput() {
        await BrowserActions.waitForElementToAppear(this.giftCardRecipientInput);
        return await BrowserActions.isElementDisplayed(this.giftCardRecipientInput);
    }

    async getGiftCardSenderName() {
        return await BrowserActions.isElementDisplayed(this.giftCardSenderName);
    }

    async getSearchResultsNumber() {
        return await BrowserActions.getTextFromSelector(this.searchResultsNumber);
    }

    async clickSetLocation() {
        await BrowserActions.clickOnElementMobile(this.setLocation);
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

    async clickPickUpTomorrowOptionMobile() {
        await BrowserActions.clickOnElementMobile(this.bopusPickUpTomorrow);
    }

    async clickPickUpTodayOption() {
        await BrowserActions.clickOnElement(this.bopusPickUpToday);
    }

    async scrollToPickUpTodayOption() {
        await BrowserActions.scrollToElement(this.bopusPickUpToday);
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
        await BrowserActions.waitForElementToAppear(this.seoContentBlock);
    }

    async clickOnSEOContentBlock() {
        await BrowserActions.clickOnElementUsingScript(this.seoContentBlock);
    }

    async clickOnSEOContentBlockMobile() {
        await BrowserActions.clickOnElementMobile(this.seoContentBlock);
    }

    async checkForSEOContentBlock() {
        await BrowserActions.isElementDisplayed(this.seoContentBlock);
    }

    async clickPageOnSearchResultsByIndex(index) {
        await BrowserActions.clickOnElementMobile(`a[href^='?page=${index}']`);
    }

    async getPageOfSearchResultsByIndexMobile(index) {
        return await BrowserActions.clickOnElementByIndexMobile(this.pageButtons, index);
    }

    async clickOnPreviousOrNextButton(index) {
        return await BrowserActions.clickOnElementByIndexMobile(this.previousAndNextButtonSelector, index);
    }

    async clickOnPreviousOrNextButtonMobile(index) {
        return await BrowserActions.clickOnElementByIndexMobile(this.previousAndNextButtonSelectorMobile, index);
    }

    async getPreviousOrNextButtonText() {
        return await BrowserActions.getTextFromSelector(this.previousAndNextButtonSelectorMobile + "/span");
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

    async clickOnLearnMoreNCOM() {
        return await BrowserActions.clickOnElement(this.learnMoreButtonNCOM);
    }

    async clickOnLearnMoreRACK() {
        return await BrowserActions.clickOnElement(this.learnMoreButtonRACK);
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
        await BrowserActions.clickOnElementMobile(this.findBrandField);
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

    async getPlusSignAttributeLink() {
        return await BrowserActions.getAttributeFromSelector(this.plusSignButton, "href");
    }

    async clickOnRandomGWPBrandByIndex() {
        function getRandomIntInclusive(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1) + min);
        }

        const index = getRandomIntInclusive(4, 8);
        await BrowserActions.scrollToElementByIndex(this.gwpBrands, index);
        return await BrowserActions.clickOnElementByIndex(this.gwpBrands, index);
    }

    async clickOnRandomItem() {
        const index = await Helpers.getRandomNumber(0, await BrowserActions.getElementCount(this.itemOnSearchResults));
        await this.clickOnItemByIndex(index);
    }

    async clickOnRandomItemWith5Colours() {
        await BrowserActions.clickOnRandomElement(this.itemsWith5Colours);
    }

    async clickOnRandomItemWith4Colours() {
        await BrowserActions.clickOnRandomElement(this.itemsWith4Colours);
    }

    async clickOnItemByIndex(index) {
        await BrowserActions.scrollToElementByIndex(this.itemOnSearchResults, index);
        if (!await BrowserActions.isBrowserFirefox()) {
            await BrowserActions.clickOnElementByIndex(this.itemOnSearchResults, index);
        } else {
            await BrowserActions.clickOnElement(`//*[@id='product-results-view']//section//article[${index + 1}]/h3/a`);
        }
    }

    async clickOnRandomItemMobile() {
        await BrowserActions.scrollToElement(this.itemOnSearchResultsMobile);
        if (!await BrowserActions.isDeviceIPhone()) {
            await BrowserActions.scrollByPx(5, -100);
        }
        await BrowserActions.clickOnRandomElement(this.itemOnSearchResultsMobile);
    }

    async clickOnRandomItemWithMoreThanNColours(colors) {
        const size = await BrowserActions.getElementCount(this.itemOnSearchResults);
        for (let i = 1; i < size; i++) {
            const number = await BrowserActions.getElementCount(`//*[@id='product-results-view']//article[${i}]//li`);
            if (number > colors) {
                await this.clickOnItemByIndex(i - 1);
            }
        }
    }

    async clickOnRandomItemWithEnticement() {
        await BrowserActions.clickOnRandomElementWithScroll(this.itemsWithEnticement + "/h3/a");
    }

    async clickQuickViewOnRandomItemWithEnticement() {
        const element = await BrowserActions.getRandomElementFromCollection(this.itemsWithEnticement + "/div[1]");
        await BrowserActions.pauseExecution(1000);
        await element.scrollIntoView();
        await BrowserActions.pauseExecution(100);
        await element.moveTo();
        await BrowserActions.pauseExecution(100);
        try {
            await BrowserActions.clickOnElementMobile(this.quickViewButton);
        } catch (e) {
            this.counter++;
            if (this.counter < 8) {
                await this.clickQuickViewOnRandomItemWithEnticement();
            }
        }
        await BrowserActions.pauseExecution(200);
    }

    async clickQuickViewOnRandomItem() {
        await BrowserActions.pauseExecution(200);
        let index;
        if (!await BrowserActions.isBrowserSafari()) {
            index = await Helpers.getRandomNumber(0, await BrowserActions.getElementCount(this.itemOnSearchResults));
        } else {
            index = await Helpers.getRandomNumber(0, 5);
        }
        const productLocator = `//*[@id='product-results-view']//section//article[${index + 1}]/div[1]`;
        if (!await BrowserActions.isBrowserSafari()) {
            await BrowserActions.mouseOverElement(productLocator);
        } else {
            await BrowserActions.scrollToElement(productLocator);
            await BrowserActions.mouseOverElementSafari(productLocator);
        }
        await BrowserActions.pauseExecution(200);
        try {
            await BrowserActions.clickOnElementMobile(this.quickViewButton);
        } catch (e) {
            this.counter++;
            if (this.counter < 8) {
                await this.clickQuickViewOnRandomItem();
            }
        }
        await BrowserActions.pauseExecution(200);
    }

    async getSearchResultCountGWP() {
        return await BrowserActions.getElementCount(this.searchResultSelectorForGWPItems);
    }

    async clickOnRandomGWPBrandByIndexMobile() {
        const index = await BrowserActions.getRandomNumber(4, 20);
        return await BrowserActions.getRandomGWPBrandTitle(this.gwpBrands, index);
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

    async clickOnRandomProductWithReviews() {
        await this.clickOnRandomProductWithNReviews(11);
    }

    async clickOnRandomProductWithNReviews(reviewsCount) {
        await BrowserActions.scrollToElement(this.productResultsWithReviews);
        const resultsWithReviews = await BrowserActions.getTextFromMultipleSelectors(this.productResultsWithReviews);
        for (let i = 0; i < resultsWithReviews.length; i++) {
            if (await Helpers.trimAllNonNumericCharacters(await resultsWithReviews[i]) >= reviewsCount) {
                await BrowserActions.scrollToElementByIndex(this.productResultsWithReviews, i);
                await BrowserActions.clickOnElementByIndex(this.productResultsWithReviews, i);
                break;
            }
        }
    }

    async clickOnRandomProductWithReviewsMobile() {
        await this.clickOnRandomProductWithNReviewsMobile(11);
    }

    async clickOnRandomProductWithNReviewsMobile(reviewsCount) {
        const resultsWithReviews = await BrowserActions.getTextFromMultipleSelectors(this.productResultsWithReviews);
        for (let i = 1; i < resultsWithReviews.length; i++) {
            if (await Helpers.trimAllNonNumericCharacters(await resultsWithReviews[i]) >= reviewsCount) {
                await BrowserActions.scrollToElementByIndex(this.productResultsWithReviews, i);
                await BrowserActions.clickOnElementByIndexMobile(this.productResultsWithReviewsArticle, i);
                break;
            }
        }
    }

    async clickOnRandomProductWithoutReviews() {
        for (let i = 1; i < await BrowserActions.getElementCount(this.allResults); i++) {
            if (!await BrowserActions.isElementDisplayed(
                this.allResults + `[${i}]` + this.productResultsWithReviews)) {
                await BrowserActions.scrollToElement(this.allResults + `[${i}]`);
                await BrowserActions.clickOnElementMobile(this.allResults + `[${i}]`);
            }
        }
    }

    async clickOnRandomProductWithoutReviewsMobile() {
        for (let i = 1; i < await BrowserActions.getElementCount(this.allResults); i++) {
            if (!await BrowserActions.isElementDisplayed(
                this.allResults + `[${i}]` + this.productResultsWithReviews)) {
                await BrowserActions.clickOnElementByIndexMobile(this.itemOnSearchResultsMobile, i - 1);
            }
        }
    }

    async clickOnRandomItemWithUMAPLabel() {
        const size = await BrowserActions.getElementCount(this.allResults);
        for (let i = 1; i < size; i++) {
            const number = await BrowserActions.getElementCount(
                `//*[@id='product-results-view']//section/div/article[${i}]/span`);
            if (number > 0) {
                await BrowserActions.scrollToElement(this.allResults + `[${i}]`);
                await BrowserActions.clickOnElementMobile(this.allResults + `[${i}]`);
                break;
            }
        }
    }

    async clickOnItemWithUMAPLabelMobile() {
        await BrowserActions.scrollToElement(this.umapProductMobile);
        await BrowserActions.clickOnElementMobile(this.umapProductMobile);
    }

    async clickOnRandomItemWithLimitedTimeSaleLabel() {
        await BrowserActions.scrollToElement(this.itemOnSearchResults);
        const size = await BrowserActions.getElementCount(this.itemOnSearchResults);
        await BrowserActions.pauseExecution(3000);
        for (let i = 1; i < size; i++) {
            const number = await BrowserActions.getElementCount("//*[contains(text(),'Limited-Time Sale')]");
            if (number > 0) {
                await BrowserActions.scrollToElementByIndex(this.itemOnSearchResults, i - 1);
                await BrowserActions.clickOnElementByIndex(this.itemOnSearchResults, i - 1);
                break;
            }
        }
        await BrowserActions.pauseExecution(3000);
    }

    async clickOnItemWithLimitedTimeSaleLabelMobile() {
        await BrowserActions.scrollToElement(this.limitedTimeSaleItemMobile);
        await BrowserActions.clickOnElementMobile(this.limitedTimeSaleItemMobile);
        await BrowserActions.pauseExecution(5000);
    }

    async waitForSearchResultsToAppear() {
        await BrowserActions.waitForElementToAppear(this.searchResultSelectorMobile);
    }

    async clickSearchResultWithColors(colorsCount) {
        await BrowserActions.clickOnRandomElement(
            `${this.productResultsViewArticle}//div[2]//ul/li[${colorsCount}]/ancestor::article`);
    }

    async clickSearchResultWithColorsMobile(colorsCount) {
        await BrowserActions.clickOnRandomElement(
            `${this.productResultsViewArticle}//ul/li[${colorsCount}]/ancestor::article/div/a`);
    }

    async clickSearchResultWithSale() {
        await BrowserActions.clickOnRandomElement(
            `${this.productResultsViewArticle}//*[contains(text(),'% off')]/ancestor::article`);
    }

    async clickSearchResultWithSaleMobile() {
        await BrowserActions.clickOnRandomElement(
            `${this.productResultsViewArticle}//*[contains(text(),'% off')]/ancestor::article/div/a`);
    }

    async getAnniversaryEarlyAccessLabelCount() {
        return await BrowserActions.getElementCount(this.anniversaryEarlyAccessLabel);
    }

    async getAnniversarySaleLabelCount() {
        return await BrowserActions.getElementCount(this.anniversarySaleLabel);
    }

    async getGroomingExclusiveLabelCount() {
        return await BrowserActions.getElementCount(this.groomingExclusiveLabel);
    }

    async getBeautyExclusiveLabelCount() {
        return await BrowserActions.getElementCount(this.beautyExclusiveLabel);
    }

    async waitAnniversarySaleLabelCountMoreThan(number) {
        await BrowserActions.pauseExecutionUntilConditionMet(numberOfElementsToBeMoreThan(this.anniversarySaleLabel, number));
    }

    async waitBeautyExclusiveLabelCountMoreThan(number) {
        await BrowserActions.pauseExecutionUntilConditionMet(numberOfElementsToBeMoreThan(this.beautyExclusiveLabel, number));
    }

    async selectHomeCategory() {
        await BrowserActions.clickOnElement(this.homeCategory);
    }

    async chooseSizeQuickView() {
        await BrowserActions.pauseExecution(500);
        if (await BrowserActions.isElementDisplayed(this.sizeDropdownQV)) {
            await BrowserActions.clickOnElementMobile(this.sizeDropdownQV);
            await BrowserActions.clickRandomElementFilterByText(this.sizeOptionListQV, "Not available");
        }
    }

    async clickAddToBagQuickView() {
        await BrowserActions.clickOnElementMobile(this.addToBagQV);
    }

    async isSomeArrivesBeforeChristmasEnticementDisplayed() {
        await BrowserActions.waitForElementToAppear(this.holidayEnticementQV);
        return await BrowserActions.isElementDisplayed(this.holidayEnticementQV);
    }
}
