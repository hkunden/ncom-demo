/* global $, $$, browser */
import Page from "./page";
import BrowserActions from "../browser-actions";
import Helpers from "../helpers";
import {numberOfElementsToBeMoreThan, visibilityOf} from "wdio-wait-for";

import _ from "lodash";

export default class ProductDetailPage extends Page {
    constructor(...args) {
        super(...args);
        this.addToBagButtonSelector = "#product-page-add-to-bag-button,#sticky-product-page-add-to-bag-button";
        this.addToBagModalSelector = "#add-to-bag-modal";
        this.addToWishlistLinkSelector = "#product-page-wish-list-link,#product-page-wish-list-button";
        this.addToWishlistButton = "#product-page-wish-list-button";
        this.addToWishlistTextSelector = "#wish-list-button-text";
        this.checkoutLinkSelector = "#product-page-add-to-bag-modal-checkout-link";
        this.colorFilterSelector = "#color-filter-product-page-anchor";
        this.pageContainerSelector = "#pdp";
        this.detailsAndSizeContainerSelector = "#details-and-size";
        this.detailsAndSizeShippingDetails = "#details-and-size-shipping-details-see-more";
        this.moveToAnotherListButtonSelector = "button=Move to Another List";
        this.pageTitleSelector = "h1[itemprop=\"name\"]";
        this.skuFilterSelector = "#desktop-sku-filters";
        this.skuFilters = "[id*=\"-filter-product-page-anchor\"]";
        this.skuFilterOptionList = "ul[id*=\"-filter-product-page-option-list\"] li";
        this.widthFilterSelector = "#width-filter-product-page-anchor";
        this.getSignInModalFormSelector = "form#sign-in";
        this.getSignInModalFormMobileSelector = "form#sign-in,form#account-check-form";
        this.fitlerOptionSelector = "span=${text}`";
        this.soldOutStatus = "//*[@id='selling-essentials']//h3";
        this.soldOutStatusMobile = "#pdp > div  h3";
        this.sizeGuideLink = "//*[@id='desktop-sku-filters']/div/button";
        this.sizeGuideLinkMobile = "//*[contains(text(),'Size guides')]";
        this.sizeGuideDialog = "//*[@id='dialog-description']";
        this.sizeGuideDialogPDF = "//*[@id='sizer']";
        this.sizeInfo = "//*[contains(text(),'Size Info')]";
        this.productResults = "#product-results-view article h3 > a";
        this.addedToYourBagPopup = "//*[@id='add-to-bag-modal']";
        this.addedToYourBagMessage = "//*[contains(text(),'Added to your bag')]";
        this.closeAddedToYourBag = "/following-sibling::a";
        this.inYourBag = "//*[@id='product-page-in-your-bag-button']";
        this.sizeDropdown = "#size-filter-product-page-anchor";
        this.sizeOptionList = "#size-filter-product-page-option-list li";
        this.chooseSizeError = "//*[@id='size-filter-product-page-anchor']/following-sibling::div/div/div/span";
        this.chooseSizeErrorMobile = "//*[@id='ADD_TO_BAG-product-page']/div/div/div/span";
        this.arrowShowAll = "//*[@class='nui-icon-large-chevron-down-0']/ancestor::button";
        this.arrowShowLess = "//*[@class='nui-icon-large-chevron-up-0']/ancestor::button";
        this.galleryItemContainer = "//*[contains(@id,'gallery-item-container-zoom-')]";
        this.colorOptions = "#product-page-color-swatches li";
        this.colorOptionsMobile = "//*[contains(@id,'color-swatch-item-')]";
        this.colorOptionsIcons = this.colorOptions + " button";
        this.colorOptionsIconsMobile = this.colorOptionsMobile + "//button";
        this.colorDropdown = "#color-filter-product-page-anchor";
        this.colorOptionList = "#color-filter-product-page-option-list li";
        this.personalizedField = "//*[@id='customization-input']";
        this.personalizedFieldErrorMessage = "//*[@id='ADD_TO_BAG-product-page']";
        this.personalizedFieldLooksGood = "//*[@id='customization-btn-looks-good']";
        this.mainGalleryImage = "//*[@id='gallery-item-container-zoom-0']//img";
        this.mainGalleryImageMobile = "#pdp section img";
        this.numberOfPeopleViewingAnItem = "#active-viewer";
        this.reviewsContainer = "//*[@id='reviews-container']/div";
        this.loadMoreReviews = "//*[contains(@href,'?page=')]";
        this.wishListSignInPopup = "#sign-in,#account-check";
        this.zipCodePopover = "#controls-zip-code-form-popover";
        this.zipCodePopoverMobile = "//*[@id='fulfillment-type-options-group']//*[@value='SHIPPING']/parent::label//button";
        this.zipCodeFormInput = "#zip-code-form-input";
        this.zipCodeFormSubmit = "#zip-code-form-submit";
        this.shippingTo = "//*[@id='controls-zip-code-form-popover']/parent::div";
        this.shippingToMobile = "//*[contains(text(),'Free Shipping to')]/parent::p/parent::div";
        this.productRecommendations = "//*[@id='product-recommendations-shelf-pdp-1']/div/section/div/ul/li";
        this.productRecommendationsRack = "//*[@id='product-recommendations-shelf-productpage1']/div/section/div/ul/li";
        this.productBrandTitle = "//*[@id='product-page-product-title-lockup']//h2/a";
        this.quantity = "//*[@aria-label='Quantity']";
        this.quantityMobile = "#product-page-quantity-input > p";
        this.plusQuantityMobile = "//*[@id='product-page-quantity-input']/button[2]";
        this.thresholdsErrorMessage = "//*[@id='product-page-quantity-input']//div";
        // eslint-disable-next-line max-len
        this.currentPrice = "//*[@id='product-page-product-title-lockup']/following-sibling::div//*[contains(text(),'$')]";
        this.currentPricePDP = "//*[@id='product-page-product-title-lockup']/following-sibling::div//*[contains(text(),'Current Price')]";
        this.proposition65LinkIPhone = "#prop-65-text > button";
        this.proposition65Link = "#prop-65-text";
        this.proposition65Message = "//*[contains(text(),'California Proposition 65')]";
        this.gwpLink = "#product-page-details-link-GIFT_WITH_PURCHASE";
        this.gwpMessage = "#product-page-enticement-modal-title-GIFT_WITH_PURCHASE";
        this.writeReviewButton = "#write-review-button";
        this.buyAndSaveLink = "#product-page-details-link-BUY_AND_SAVE";
        this.buyAndSavePopup = "#product-page-enticement-modal-title-BUY_AND_SAVE";
        this.chanelLogo = "#chanel-banner";
        this.productPageReviews = "#product-page-reviews h2";
        this.sortReviewByFilter = "//*[contains(@id,'sort-by-filter-')]";
        this.sortReviewByHighestRated = "//*[contains(text(),'Highest Rated')]";
        this.sortReviewByLowestRated = "//*[contains(text(),'Lowest Rated')]";
        this.sortReviewByMostRecent = "//*[contains(text(),'Most Recent')]";
        this.sortReviewByMostHelpful = "//*[contains(text(),'Most Helpful')]";
        this.overallReviewsCount = "//*[@id='reviews']//*[contains(text(),'(')]";
        this.reviewStars = "//*[contains(@id,'review-stars-')]/span/span[2]";
        this.reviewDate = "//*[contains(@id,'review-stars-')]/following-sibling::span";
        this.reviewLikes = "//*[contains(@id,'review-')]/div/div/div//strong";
        this.reviewLikesMobile = "//*[contains(@id,'review-')]/div/div//strong";
        this.chatWithUsLink = "//*[@id='style-call-center-info']//*[contains(@href,'browse/customer-service')]";
        this.productReviewsStars = "#product-page-review-stars";
        this.seeAlReviews = "//*[contains(text(),'See all reviews')]";
        this.styleIdeas = "#desktop-ng-looks-2";
        this.stylistNamesList = "//*[@id='product-page-looks-shelf']//*[contains(@data-testid,'curator-link')]";
        this.umapProduct = "//*[contains(text(),'Add to Bag or Wish List to see price')]";
        this.umapProductMobile = "//*[contains(text(),'Add to Bag or Wish List to see price')]/parent::article/div/a";
        this.itemOnSearchResults = "#product-results-view article h3 > a";
        this.reviewStarsCheckboxes = "//*[@id='reviews']//*[contains(text(),' star')]/ancestor::label";
        this.reviewStarsPercentage = "//*[@id='reviews']/section/div/div/div/div/span[2]";
        this.limitedTimeSaleNCOM = "//*[contains(@id,'-PRICE_MATCHED')]|//*[@id='product-page-enticement-EXTRA_SAVINGS']/span";
        this.searchReviewsField = "//*[contains(@id, 'pdp-review-search-input')]";
        this.reviewsTextStrong = "//*[@id='reviews-container']//*[contains(@id,'review-')]/div//strong";
        this.reviewsTextStrongMobile = "//*[@id='reviews-container']//*[contains(@id,'review-')]/div//strong";
        this.reviewsResultsMessageText = "//*[@id='reviews']/section//form/p";
        this.reviewsText = "//*[@id='reviews-container']//*[contains(@id,'review-')]/div[2]/div[2]";
        this.reviewsTextMobile = "//*[@id='reviews-container']//div[contains(@id,'review-')]";
        this.searchReviewsSubmit = "//*[@type='submit']";
        this.viewShoppingBagLink = "#product-page-add-to-bag-modal-shopping-bag-link";
        this.viewBagAndCheckoutButton = "//*[@id='shopping-bag-popover']//*[@href='/shopping-bag']";
        this.recommendationTrayNCOM = "//*[contains(@id, 'product-recommendations-shelf-seeded')]";
        this.recommendationTrayRACK = "//*[contains(@id, 'product-recommendations-shelf-productpage2')]";
        this.recommendationTraysTitlesNCOM = "//*[contains(@id, 'product-recommendations-shelf-seeded')]/nav/ul/li";
        this.recommendationTraysTitlesRACK = "//*[contains(@id, 'product-recommendations-shelf-productpage2')]/div[1]/header/h2";
        this.rightReccommendationAccordionNCOM = "//*[@id='product-recommendations-shelf-pdp-1']/div/section/div/ul/li";
        this.rightReccommendationAccordionRACK = "//*[@id='product-recommendations-shelf-productpage1']/div/section/div/ul/li";
        // eslint-disable-next-line max-len
        this.recommendationTrayItemsNCOM = "//*[contains(@id, 'product-recommendations-shelf-seeded')]/div/section/div/ul/li";
        this.recommendationTrayItemsRACK = "//*[contains(@id, 'product-recommendations-shelf-productpage2')]/div/section/div/ul/li";
        this.freeShippingLabel = "#free-shipping-label";
        this.mobileLowerSKUFilters = "#mobile-lower-sku-filters";
        this.productSize = "//*[@id='size-filter-product-page-anchor']//*[contains(text(),'Size')]";
        this.verifiedPurchasesCheckbox = "//*[@name='Verified reviews']/following-sibling::button";
        this.verifiedPurchasesReviewLabel = "//*[contains(@id, 'review-')]//*[text()='Verified purchase']";
        this.productName = "//*[@id='product-page-product-title-lockup']//h1";
        this.productSelectedSize = "//*[@id='size-filter-product-page-anchor']/div//span/span/span[1]";
        // eslint-disable-next-line max-len
        this.productSelectedSizeMobile = "//*[contains(@aria-label,'carousel-slider')]//*[contains(@id,'selected') and contains(@id,'size')]";
        this.productSelectedColor = "//*[contains(@id,'color-swatch-item-')]//*[contains(@alt,'selected ')]";
        this.looksGridItem = "//*[contains(@data-testid,'look-grid-item-')]";
        this.looksAddToBag = "#controls-ADD_TO_BAG-looks-from_shopping_bag > div";
        this.colorOptionsInDropdown = "//*[@role='option']";
        this.anniversaryPreviewLabel = "//*[text()='Anniversary Preview']";
        this.anniversaryPreviewLink = "//*[@id='product-page-details-link-ANNIVERSARY_EARLY_ACCESS_PREVIEW']";
        this.anniversaryAccessLabel = "//*[text()='Anniversary Early Access']";
        this.anniversaryAccessLink = "//*[@id='product-page-details-link-ANNIVERSARY_EARLY_ACCESS']";
        this.anniversarySaleLabel = "//*[@id='product-page-enticement-ANNIVERSARY_SALE']";
        this.anniversaryDialog = "//*[@id='dialog-description']/span";
        this.closeAnniversaryDialog = "//*[@href='#close-modal']/*";
        this.sizeSwatch = "//*[contains(@id,'size-swatch-item-')]//button";
        this.sizeSwatchItem1 = "//*[contains(@id,'size-swatch-item-1')]//button";
        this.sizeRightArrow = "//*[@id='mobile-lower-sku-filters']/div[1]/div[2]//*[contains(@class,'slider-control-centerright')]/span";
        this.anniversaryItemWillBeAvailable = "//*[contains(@title,'Learn more about Anniversary')]/parent::p";
        this.addToBagWithNCard = "//*[@id='product-page-add-card-button']";
        this.applyForNCard = "//*[@id='product-page-apply-for-card-button']";
        this.beautyExclusiveLabel = "//*[@id='product-page-enticement-ANNIVERSARY_BEAUTY_EXCLUSIVE']";
        this.groomingExclusiveLabel = "//*[@id='product-page-enticement-ANNIVERSARY_GROOMING_EXCLUSIVE']";
        this.freePickupRadiobutton = "//*[@id='fulfillment-type-options-group']//*[@value='PICKUP']/parent::label";
        this.storeLink = "//*[@id='fulfillment-type-options-group']//*[contains(text(),'Free Pickup at ')]/parent::p/following-sibling::button";
        this.pdpStoreName = "//*[contains(@id,'store-')]/div/div/div//strong";
        this.pickupAtThisStore = "#bopus-submit-button";
        this.addedToWishlistMessage = "//*[contains(text(),'Added to ')]";
        this.exclusionsApplyLink = "//*[@id='free-shipping-label']/following-sibling::a";
        this.shippingAndReturnsHoliday = "//*[contains(text(),'Shipping & returns')]";
        this.someArrivesBeforeChristmasEnticement = "//*[@id='product-page-enticement-SOME_ARRIVES_BY_CHRISTMAS_EVE']";
        this.sizeTooltip = "//*[@role='tooltip']";
    }

    async open(productId) {
        await super.open(`s/${productId}`);
    }

    async checkForCoreComponents() {
        await BrowserActions.waitForElementToAppear(this.pageContainerSelector);
        await BrowserActions.waitForElementToAppear(this.skuFilterSelector);
        await BrowserActions.waitForElementToAppear(this.detailsAndSizeContainerSelector);
        await BrowserActions.waitForElementToAppear(this.addToBagButtonSelector);
    }

    async checkForCoreComponentsMobile() {
        await BrowserActions.waitForElementToAppear(this.pageContainerSelector);
        await BrowserActions.waitForElementToAppear(this.detailsAndSizeContainerSelector);
        await BrowserActions.waitForElementToAppear(this.addToBagButtonSelector);
    }

    async selectProductFilters() {
        const skuFiltersSection = await $(this.skuFilterSelector);
        const skuFiltersCollection = await skuFiltersSection.$$(this.skuFilters);

        for (let i = 0; i < skuFiltersCollection.length; i++) {
            await skuFiltersCollection[i].click();
            const skuOptionListCollection = await $$(this.skuFilterOptionList);

            for (let j = 0; j < skuOptionListCollection.length; j++) {
                const skuOptionText = await skuOptionListCollection[j].getText();
                if (skuOptionText.includes("Not available")) {
                    continue;
                }
                await skuOptionListCollection[j].click();
                BrowserActions.pauseExecution(200);
                break;
            }
        }
    }

    async selectAvailableFromCarousel(carouselItemList) {
        for (let index = 0; index < carouselItemList.length; index++) {
            const sizeColor = await carouselItemList[index].getCSSProperty("color");
            // available #191a1b
            // not available #a4afb2

            if (sizeColor.parsed.hex === "#191a1b") {
                await carouselItemList[index].scrollIntoView();
                await carouselItemList[index].click();
                break;
            }
        }
    }

    async selectProductFiltersMobile() {
        const widthList = await $$("div#mobile-lower-sku-filters li[id*=width-swatch-item] button");
        await BrowserActions.pauseExecution(500);
        if (widthList !== null) {
            await this.selectAvailableFromCarousel(widthList);
        }

        const sizeList = await $$("div#mobile-lower-sku-filters li[id*=size-swatch-item]");
        await BrowserActions.pauseExecution(500);
        if (sizeList !== null) {
            // There are 2 lists of size-swatch-item
            // Split them and select
            const swatchIds = [];
            for (let index = 0; index < sizeList.length; index++) {
                const id = await sizeList[index].getAttribute("id");
                swatchIds.push(id);
            }

            // console.log(`Size Length: ${sizeList.length} \t Id Length = ${swatchIds.length}`);
            const indexOfSwatch = swatchIds.indexOf("size-swatch-item-1", 1);

            const sizeListButton = await $$("div#mobile-lower-sku-filters li[id*=size-swatch-item] button");
            await BrowserActions.pauseExecution(500);
            if (indexOfSwatch > 1) {
                const sizeList1 = sizeListButton.splice(0, indexOfSwatch);
                const sizeList2 = sizeListButton;

                await this.selectAvailableFromCarousel(sizeList1);
                await BrowserActions.pauseExecution(500);
                await this.selectAvailableFromCarousel(sizeList2);
            } else {
                await this.selectAvailableFromCarousel(sizeListButton);
            }
        }
    }

    async addToWishlist({authenticated = false} = {}) {
        await this.selectProductFilters();

        await BrowserActions.clickOnElement(this.addToWishlistButton);

        if (!authenticated) {
            await BrowserActions.waitForElementToAppear(this.getSignInModalFormSelector);
        } else {
            await BrowserActions.waitForElementToAppear(this.moveToAnotherListButtonSelector);
        }
    }

    async addToWishlistMobile({authenticated = false} = {}) {
        await this.selectProductFiltersMobile();

        await $(this.addToWishlistButton).scrollIntoView({behavior: "smooth", block: "end"});

        await BrowserActions.pauseExecution(5000);
        await BrowserActions.clickOnElementMobile(this.addToWishlistButton);
        if (!authenticated) {
            await browser.waitUntil(
                () => browser.execute(() => document.readyState === "complete"),
                {
                    timeout: 60000,
                    timeoutMsg: "Failed to navigate to sign in page."
                }
            );
            await BrowserActions.waitForElementToAppear(this.getSignInModalFormMobileSelector);
        } else {
            await BrowserActions.pauseExecution(1000);
            await $(this.addToWishlistTextSelector).scrollIntoView();
            const wishlistText = await $(this.addToWishlistTextSelector).getText();
            if (wishlistText !== "Added to Wish List") {
                throw Error(`Did not add to wishlist. Wishlist Button text - ${wishlistText}`);
            }
        }
    }

    async isSignInModalFormDisplayed() {
        await BrowserActions.waitForElementToAppear(this.getSignInModalFormSelector);
        return await BrowserActions.isElementDisplayed(this.getSignInModalFormSelector);
    }

    async isMoveToADifferentListDisplayed() {
        await BrowserActions.waitForElementToAppear(this.moveToAnotherListButtonSelector);
        return await BrowserActions.isElementDisplayed(this.moveToAnotherListButtonSelector);
    }

    async clickAddToWishlist() {
        await BrowserActions.clickOnElementMobile(this.addToWishlistLinkSelector);
    }

    async scrollToAddToWishlistButton() {
        await BrowserActions.scrollToElement(this.addToWishlistButton);
    }

    async clickAddToWishlistButton() {
        await BrowserActions.clickOnElementMobile(this.addToWishlistButton);
    }

    async isAddToWishlistButtonDisplayed() {
        return await BrowserActions.isElementDisplayed(this.addToWishlistButton);
    }

    async isAddToWishlistLinkDisplayed() {
        return await BrowserActions.isElementDisplayed(this.addToWishlistLinkSelector);
    }

    async addProductToBag() {
        await this.selectProductFilters();
        await BrowserActions.clickOnElement(this.addToBagButtonSelector);
        await BrowserActions.waitForElementToAppear(this.addToBagModalSelector);
    }

    async clickAddToBag() {
        await BrowserActions.clickOnElementUsingScript(this.addToBagButtonSelector);
    }

    async clickAddToBagMobile() {
        await BrowserActions.clickOnElementMobile(this.addToBagButtonSelector);
    }

    async isAddToBagModalDisplayed() {
        let result = true;
        try {
            await BrowserActions.waitForElementToAppear(this.addToBagModalSelector);
        } catch (e) {
            result = false;
        }
        return result;
    }

    async scrollToAddToBag() {
        await BrowserActions.scrollToElement(this.addToBagButtonSelector);
    }

    async checkoutFromAddToBagModal() {
        await BrowserActions.clickOnElement(this.checkoutLinkSelector);
    }

    async checkoutFromAddToBagModalMobile() {
        await BrowserActions.clickOnElementMobile(this.checkoutLinkSelector);
    }

    async getSoldOutStatus() {
        return await BrowserActions.getTextFromSelector(this.soldOutStatus);
    }

    async getSoldOutStatusMobile() {
        return await BrowserActions.getTextFromSelector(this.soldOutStatusMobile);
    }

    async clickSizeGuideLink() {
        return await BrowserActions.clickOnElement(this.sizeGuideLink);
    }

    async getSizeGuideIsDisplayed() {
        return await BrowserActions.isElementDisplayed(this.sizeGuideLink);
    }

    async getSizeGuideMobileUsingScript() {
        await BrowserActions.scrollToElement(this.sizeGuideLinkMobile);
        await BrowserActions.pauseExecution(200);
        return await BrowserActions.clickOnElementUsingScript(this.sizeGuideLinkMobile);
    }

    async getSizeGuideLinkDisplayedMobile() {
        return await BrowserActions.isElementDisplayed(this.sizeGuideLinkMobile);
    }

    async checkForSizeGuideDialogIsDisplayed() {
        await BrowserActions.isElementDisplayed(this.sizeGuideDialog);
    }

    async checkForSizeGuideDialog() {
        const b = await BrowserActions.isElementDisplayed(this.sizeGuideDialog);
        const b1 = await BrowserActions.isElementDisplayed(this.sizeGuideDialogPDF);
        return (await b || await b1);
    }

    async getSizeInfo() {
        return await BrowserActions.getTextFromSelector(this.sizeInfo);
    }

    async clickOnRandomProductMobile() {
        await BrowserActions.scrollByPx(5, 200);
        await BrowserActions.clickOnRandomElement(this.productResults);
    }

    async getAddedToYourBagMessageStatus() {
        await BrowserActions.waitForElementToAppear(this.addedToYourBagMessage);
        return await BrowserActions.isElementDisplayed(this.addedToYourBagPopup + this.addedToYourBagMessage);
    }

    async waitForAddedToYourBagPopupToAppear() {
        return await BrowserActions.waitForElementToAppear(this.addedToYourBagPopup);
    }

    async clickCloseAddedToYourBagPopup() {
        await BrowserActions.clickOnElementMobile(this.addedToYourBagPopup + this.closeAddedToYourBag);
    }

    async clickCloseAddedToYourBagPopupMobile() {
        await BrowserActions.clickOnElementMobile(this.addedToYourBagPopup + this.closeAddedToYourBag);
    }

    async getInYourYourBagStatus() {
        await BrowserActions.waitForElementToAppear(this.inYourBag);
        return await BrowserActions.isElementDisplayed(this.inYourBag);
    }

    async clickSizeDropDown() {
        await BrowserActions.scrollToElement(this.addToBagButtonSelector);
        if (await BrowserActions.getElementCount(this.sizeOptionList) === 0) {
            await BrowserActions.clickOnElement(this.sizeDropdown);
        }
    }

    async clickColorDropDown() {
        await BrowserActions.scrollToElement(this.addToBagButtonSelector);
        if (await BrowserActions.getElementCount(this.colorOptionList) === 0) {
            await BrowserActions.clickOnElement(this.colorDropdown);
        }
    }

    async chooseSize() {
        if (await BrowserActions.isElementDisplayed(this.sizeDropdown)) {
            await BrowserActions.scrollToElement(this.sizeDropdown);
            await BrowserActions.clickOnElementMobile(this.sizeDropdown);
            await BrowserActions.clickRandomElementFilterByText(this.sizeOptionList, "Not available");
        } else if (await BrowserActions.isElementDisplayed(this.sizeSwatch)) {
            if (await BrowserActions.getElementCount(this.sizeSwatchItem1) > 1) {
                await BrowserActions.scrollToElementByIndex(this.sizeSwatchItem1, 1);
                await BrowserActions.clickOnElementByIndexMobile(this.sizeSwatchItem1, 1);
            } else {
                await BrowserActions.scrollToElementByIndex(this.sizeSwatch, 0);
                await BrowserActions.clickOnElementByIndexMobile(this.sizeSwatch, 0);
            }
        }
    }

    async chooseSizeByIndex(index) {
        if (await BrowserActions.isElementDisplayed(this.sizeSwatch)) {
            try {
                await BrowserActions.scrollToElementByIndex(this.sizeSwatch, index);
                await BrowserActions.clickOnElementByIndexMobile(this.sizeSwatch, index);
            } catch (e) {
                await BrowserActions.clickOnElementMobile(this.sizeRightArrow);
            }
        }
    }

    async chooseSizeAndAddToBagWithRetry() {
        if (await BrowserActions.isElementDisplayed(this.sizeSwatch)) {
            const sizeCount = await BrowserActions.getElementCount(this.sizeSwatch);
            for (let i = 0; i < sizeCount; i++) {
                try {
                    await BrowserActions.scrollToElementByIndex(this.sizeSwatch, i);
                    await BrowserActions.clickOnElementByIndexMobile(this.sizeSwatch, i);
                    await BrowserActions.pauseExecution(200);
                    await this.clickAddToBagMobile();
                    await BrowserActions.pauseExecution(500);
                    if (!await BrowserActions.isElementDisplayed(this.sizeTooltip)) {
                        break;
                    }
                } catch (err) {
                    console.log("Size " + i + " not available");
                    if (i % 3 === 0) {
                        await BrowserActions.clickOnElementMobile(this.sizeRightArrow);
                    }
                }
            }
        }
    }

    async clickColorDropDownMobile() {
        await BrowserActions.scrollToElement(this.colorDropdown);
        await BrowserActions.clickOnElementMobile(this.colorDropdown);
    }

    async clickRandomSize() {
        await BrowserActions.clickRandomElementFilterByText(this.sizeOptionList, "Not available");
    }

    async clickSizeByIndex(index) {
        if (await BrowserActions.isElementDisplayed(this.sizeDropdown)) {
            await BrowserActions.scrollToElement(this.sizeDropdown);
            await BrowserActions.clickOnElementMobile(this.sizeDropdown);
            await BrowserActions.clickOnElementByIndex(this.sizeOptionList, index);
        } else if (await BrowserActions.isElementDisplayed(this.sizeSwatch)) {
            await BrowserActions.scrollToElementByIndex(this.sizeSwatch, index);
            await BrowserActions.clickOnElementByIndexMobile(this.sizeSwatch, index);
        }
    }

    async clickFirstSizeMobile() {
        await BrowserActions.clickOnElementByIndexMobile(this.sizeOptionList, 0);
    }

    async clickSecondSize() {
        await BrowserActions.clickOnElementByIndex(this.sizeOptionList, 2);
    }

    async clickSecondSizeMobile() {
        await BrowserActions.clickOnElementByIndexMobile(this.sizeOptionList, 2);
    }

    async getChooseSizeErrorMessage() {
        return await BrowserActions.getTextFromSelector(this.chooseSizeError);
    }

    async getChooseSizeErrorMessageMobile() {
        return await BrowserActions.getTextFromSelector(this.chooseSizeErrorMobile);
    }

    async getArrowDownIsDisplayed() {
        return await BrowserActions.isElementDisplayed(this.arrowShowAll);
    }

    async clickArrowDown() {
        await BrowserActions.clickOnElement(this.arrowShowAll);
    }

    async clickArrowDownJS() {
        await BrowserActions.clickOnElementUsingScript(this.arrowShowAll);
    }

    async getArrowUpIsDisplayed() {
        await BrowserActions.scrollToElement(this.arrowShowLess);
        return await BrowserActions.isElementDisplayed(this.arrowShowLess);
    }

    async getGalleryImagesCount() {
        return await BrowserActions.getElementCount(this.galleryItemContainer);
    }

    async clickArrowUp() {
        return await BrowserActions.clickOnElement(this.arrowShowLess);
    }

    async getColorOptionIconCount() {
        return await BrowserActions.getElementCount(this.colorOptions);
    }

    async getColorOptionIconCountMobile() {
        return await BrowserActions.getElementCount(this.colorOptionsMobile);
    }

    async clickColorOptionIconByIndex(index) {
        return await BrowserActions.clickOnElementByIndex(this.colorOptions, index);
    }

    async waitColorOptionCountMoreThan(number) {
        await BrowserActions.pauseExecutionUntilConditionMet(numberOfElementsToBeMoreThan(this.colorOptions, number));
    }

    async waitColorOptionCountMoreThanMobile(number) {
        await BrowserActions.pauseExecutionUntilConditionMet(numberOfElementsToBeMoreThan(this.colorOptionsMobile, number));
    }

    async getColorOptionDropdownCount() {
        await this.clickColorDropDown();
        return await BrowserActions.getElementCount(this.colorOptionList);
    }

    async getColorOptionDropdownCountMobile() {
        await this.clickColorDropDownMobile();
        return await BrowserActions.getElementCount(this.colorOptionList);
    }

    async getPersonalizedField() {
        return await BrowserActions.isElementDisplayed(this.personalizedField);
    }

    async getPersonalizedFieldErrorMessage() {
        return await BrowserActions.getTextFromSelector(this.personalizedFieldErrorMessage);
    }

    async setPersonalizedField(personalizedName) {
        await BrowserActions.setTextOnElement(this.personalizedField, personalizedName);
    }

    async clickPersonalizedFieldLooksGood() {
        if (!await BrowserActions.isBrowserSafari()) {
            await BrowserActions.clickOnElement(this.personalizedFieldLooksGood);
        } else {
            await BrowserActions.clickOnElementMobile(this.personalizedFieldLooksGood);
        }
    }

    async clickPersonalizedFieldLooksGoodMobile() {
        await BrowserActions.scrollToElement(this.personalizedFieldLooksGood);
        await BrowserActions.clickOnElementMobile(this.personalizedFieldLooksGood);
    }

    async clickOnRandomColor() {
        const colorCount = await BrowserActions.getElementCount(this.colorOptionsIcons);
        for (let i = 0; i < colorCount; i++) {
            await BrowserActions.scrollByPx(3, 100);
            const color = await BrowserActions.getAttributeFromSelectorByIndex(
                this.colorOptionsIcons + " img", "alt", i);
            if (!color.includes("selected")) {
                await BrowserActions.clickOnElementByIndexMobile(this.colorOptionsIcons, i);
                break;
            }
        }
    }

    async clickOnRandomColorMobile() {
        const colorCount = await BrowserActions.getElementCount(this.colorOptionsMobile);
        for (let i = 0; i < colorCount; i++) {
            await BrowserActions.scrollByPx(3, 100);
            const color = await BrowserActions.getAttributeFromSelectorByIndex(
                this.colorOptionsIconsMobile + "/img", "alt", i);
            if (!color.includes("selected")) {
                await BrowserActions.clickOnElementByIndexMobile(this.colorOptionsIconsMobile, i);
                break;
            }
        }
    }

    async getMainGalleryImageSrc() {
        return BrowserActions.getAttributeFromSelector(this.mainGalleryImage, "src");
    }

    async getMainGalleryImageSrcMobile() {
        await BrowserActions.scrollByPx(3, 100);
        return BrowserActions.getAttributeFromSelector(this.mainGalleryImageMobile, "src");
    }

    async getNumberOfPeopleViewingAnItemMessage() {
        return await BrowserActions.getTextFromSelector(this.numberOfPeopleViewingAnItem);
    }

    async getReviewsCount() {
        return await BrowserActions.getElementCount(this.reviewsContainer);
    }

    async waitForReviewsCountMoreThan(number) {
        await BrowserActions.pauseExecutionUntilConditionMet(
            numberOfElementsToBeMoreThan(this.reviewsContainer, number));
    }

    async clickLoadMoreReviews() {
        await BrowserActions.clickOnElementMobile(this.loadMoreReviews);
    }

    async isWishListSignInPopupDisplayed() {
        return await BrowserActions.isElementDisplayed(this.wishListSignInPopup);
    }

    async clickZipCodePopover() {
        await BrowserActions.scrollToElement(this.zipCodePopover);
        await BrowserActions.clickOnElementMobile(this.zipCodePopover);
    }

    async clickZipCodePopoverMobile() {
        await BrowserActions.scrollToElement(this.zipCodePopoverMobile);
        await BrowserActions.clickOnElementMobile(this.zipCodePopoverMobile);
    }

    async clearZipCode() {
        await BrowserActions.clearTextValue(this.zipCodeFormInput);
    }

    async setZipcode(zipCode) {
        await BrowserActions.setTextOnElement(this.zipCodeFormInput, zipCode);
    }

    async setZipcodeMobile(zipCode) {
        await BrowserActions.clickOnElementMobile(this.zipCodeFormInput);
        if (!await BrowserActions.isDeviceIPhone()) {
            for (let i = 0; i < 6; i++) {
                await browser.pressKeyCode(67);
                await BrowserActions.pauseExecution(500);
            }
        }
        await BrowserActions.setTextOnElement(this.zipCodeFormInput, zipCode);
    }

    async clickZipcodeFormSubmit() {
        await BrowserActions.clickOnElementMobile(this.zipCodeFormSubmit);
    }

    async getShippingToText() {
        return await BrowserActions.getTextFromSelector(this.shippingTo);
    }

    async getShippingToTextMobile() {
        return await BrowserActions.getTextFromSelector(this.shippingToMobile);
    }

    async getProductRecommendationCount() {
        const productRecommendationsSelector = await BrowserActions.isSiteRack(global.baseUrl) ?
            this.productRecommendationsRack : this.productRecommendations;
        return await BrowserActions.getElementCount(productRecommendationsSelector);
    }

    async getProductBrandTitle() {
        return await BrowserActions.getTextFromSelector(this.productBrandTitle);
    }

    async clickProductBrandTitle() {
        await BrowserActions.clickOnElementMobile(this.productBrandTitle);
    }

    async iSetQuantity(quantity) {
        await BrowserActions.scrollToElement(this.quantity);
        await BrowserActions.setTextOnElement(this.quantity, quantity);
        await BrowserActions.clickOnElement(this.freeShippingLabel);
    }

    async iSetQuantityMobile(quantity) {
        await BrowserActions.scrollToElement(this.plusQuantityMobile);
        for (let i = 0; i < parseFloat(quantity) - 1; i++) {
            await BrowserActions.clickOnElementMobile(this.plusQuantityMobile);
        }
        await BrowserActions.clickOnElementMobile(this.mobileLowerSKUFilters);
    }

    async getCurrentPrice() {
        return await BrowserActions.getTextFromSelector(this.currentPrice);
    }

    async getPDPCurrentPrice() {
        return await BrowserActions.getTextFromSelector(this.currentPricePDP);
    }

    async scrollToPrice() {
        await BrowserActions.scrollByPx(2, -100);
    }

    async getProposition65IsDisplayed() {
        return await BrowserActions.isElementDisplayed(this.proposition65Link);
    }

    async clickProposition65Link() {
        await BrowserActions.scrollToElement(this.proposition65Link);
        if (await BrowserActions.isBrowserSafari()) {
            await BrowserActions.pauseExecution(1000);
            await BrowserActions.scrollByPx(5, 100);
            await BrowserActions.clickOnElementMobile(this.proposition65Link);
        } else {
            await BrowserActions.clickOnElement(this.proposition65Link);
        }
    }

    async clickProposition65LinkMobileIPhone() {
        await BrowserActions.scrollToElement(this.proposition65LinkIPhone);
        for (let i = 45; i < 133; i++) {
            i++;
            await BrowserActions.touchElementMobile(this.proposition65LinkIPhone, i);
            const isDisplayed = await BrowserActions.isElementDisplayed(this.proposition65Message);
            if (isDisplayed) {
                break;
            }
        }
    }

    async clickProposition65LinkMobileSamsung() {
        await BrowserActions.scrollToElement(this.proposition65Link);
        await BrowserActions.clickOnElementMobile(this.proposition65Link);
    }

    async isProposition65PopupDisplayed() {
        return await BrowserActions.isElementDisplayed(this.proposition65Message);
    }

    async waitForProposition65PopupVisible() {
        await BrowserActions.pauseExecutionUntilConditionMet(visibilityOf(this.proposition65Message));
    }

    async getGWPIsDisplayed() {
        return await BrowserActions.isElementDisplayed(this.gwpLink);
    }

    async clickGWPLink() {
        await BrowserActions.clickOnElement(this.gwpLink);
    }

    async clickGWPLinkMobile() {
        await BrowserActions.clickOnElementMobile(this.gwpLink);
    }

    async isGWPPopupDisplayed() {
        return await BrowserActions.isElementDisplayed(this.gwpMessage);
    }

    async isWriteReviewButtonDisplayed() {
        return await BrowserActions.isElementDisplayed(this.writeReviewButton);
    }

    async clickWriteReviewButton() {
        if (!await BrowserActions.isBrowserSafari()) {
            await BrowserActions.clickOnElement(this.writeReviewButton);
        } else {
            await BrowserActions.clickOnElementMobile(this.writeReviewButton);
        }
    }

    async clickWriteReviewButtonMobile() {
        await BrowserActions.scrollToElement(this.writeReviewButton);
        await BrowserActions.clickOnElementMobile(this.writeReviewButton);
    }

    async getBuyAndSaveIsDisplayed() {
        return await BrowserActions.isElementDisplayed(this.buyAndSaveLink);
    }

    async clickBuyAndSaveLink() {
        await BrowserActions.clickOnElement(this.buyAndSaveLink);
    }

    async isBuyAndSavePopupDisplayed() {
        return await BrowserActions.isElementDisplayed(this.buyAndSavePopup);
    }

    async clickBuyAndSaveLinkMobile() {
        await BrowserActions.clickOnElementMobile(this.buyAndSaveLink);
    }

    async isChanelBannerDisplayed() {
        return await BrowserActions.isElementDisplayed(this.chanelLogo);
    }

    async clickSortReviewDropdown() {
        await BrowserActions.scrollToElement(this.productPageReviews);
        if (!await BrowserActions.isBrowserSafari()) {
            await BrowserActions.clickOnElement(this.sortReviewByFilter);
        } else {
            await BrowserActions.clickOnElementMobile(this.sortReviewByFilter);
        }
    }

    async clickSortReviewDropdownMobile() {
        await BrowserActions.scrollToElement(this.sortReviewByFilter);
        await BrowserActions.scrollByPx(3, -100);
        await BrowserActions.clickOnElementMobile(this.sortReviewByFilter);
    }

    async clickSortReviewByHighestRated() {
        await BrowserActions.clickOnElementMobile(this.sortReviewByHighestRated);
    }

    async clickSortReviewByLowestRated() {
        await BrowserActions.clickOnElementMobile(this.sortReviewByLowestRated);
    }

    async clickSortReviewByMostRecent() {
        await BrowserActions.clickOnElementMobile(this.sortReviewByMostRecent);
    }

    async clickSortReviewByMostHelpful() {
        await BrowserActions.clickOnElementMobile(this.sortReviewByMostHelpful);
    }

    async isLoadMoreReviewsDisplayed() {
        return await BrowserActions.isElementDisplayed(this.loadMoreReviews);
    }

    async getOverallReviewsCount() {
        return await Helpers.trimAllNonNumericCharacters(
            await BrowserActions.getTextFromSelector(this.overallReviewsCount));
    }

    async goToPenultimateReviewPage() {
        let reviewPages = (await this.getOverallReviewsCount() / 6) - 2;
        if (reviewPages > 6) {
            reviewPages = 6;
        }
        let i = 0;
        while (await this.isLoadMoreReviewsDisplayed() && i <= reviewPages) {
            i++;
            await this.clickLoadMoreReviews();
        }
    }

    async goToPenultimateReviewPageMobile() {
        let reviewPages = (await this.getOverallReviewsCount() / 6) - 2;
        if (reviewPages > 6) {
            reviewPages = 6;
        }
        let i = 0;
        while (await this.isLoadMoreReviewsDisplayed() && i <= reviewPages) {
            i++;
            await BrowserActions.scrollToElement(this.loadMoreReviews);
            await BrowserActions.scrollByPx(3, -100);
            await this.clickLoadMoreReviews();
        }
    }

    async getReviewsStarsRating() {
        const starsStyle = await BrowserActions.getAttributeFromSelectorArray(this.reviewStars, "style");
        return await Promise.all(_.map(starsStyle, async (element) => await Helpers.trimReviewStar(element)));
    }

    async getReviewsDates() {
        const dates = await BrowserActions.getTextFromMultipleSelectors(this.reviewDate);
        return _.compact(await Promise.all(
            _.map(dates, async (element) => await Helpers.parseReviewDate(element))));
    }

    async getReviewsLikesDesktop() {
        return this.getReviewsLikes(this.reviewLikes);
    }

    async getReviewsLikesMobile() {
        return this.getReviewsLikes(this.reviewLikesMobile);
    }

    async getReviewsLikes(selector) {
        const likes = await BrowserActions.getTextFromMultipleSelectors(selector);
        return _.compact(await Promise.all(
            _.map(likes, async (element) => parseFloat(element))));
    }

    async isShippingAndReturnsDisplayed() {
        return await BrowserActions.isElementDisplayed(this.detailsAndSizeShippingDetails);
    }

    async isSizeDropdownDisplayed() {
        await BrowserActions.pauseExecution(500);
        return await BrowserActions.isElementDisplayed(this.sizeDropdown);
    }

    async isColorDropdownDisplayed() {
        return await BrowserActions.isElementDisplayed(this.colorDropdown);
    }

    async isAddToBagDisplayed() {
        return await BrowserActions.isElementDisplayed(this.addToBagButtonSelector);
    }

    async clickChatWithUsLink() {
        if (!await BrowserActions.isBrowserSafari()) {
            await BrowserActions.clickOnElement(this.chatWithUsLink);
        } else {
            await BrowserActions.scrollByPx(7, 100);
            await BrowserActions.clickOnElementMobile(this.chatWithUsLink);
        }
    }

    async getCurrentQuantity() {
        return await BrowserActions.getAttributeFromSelector(this.quantity, "value");
    }

    async getCurrentQuantityMobile() {
        return await BrowserActions.getTextFromSelector(this.quantityMobile);
    }

    async isQuantityFieldDisplayed() {
        return await BrowserActions.isElementDisplayed(this.quantity);
    }

    async getThresholdsErrorMessage() {
        return await BrowserActions.getTextFromSelector(this.thresholdsErrorMessage);
    }

    async mouseOverReviewsStars() {
        await BrowserActions.mouseOverElement(this.productReviewsStars);
    }

    async clickSeeAllReviews() {
        await BrowserActions.clickOnElementMobile(this.seeAlReviews);
    }

    async isReviewsSectionDisplayedInViewport() {
        return await BrowserActions.isDisplayedInViewport(this.writeReviewButton);
    }

    async scrollToStyleIdeas() {
        await BrowserActions.scrollToElement(this.styleIdeas);
    }

    async scrollToStyleIdeasMobile() {
        await BrowserActions.scrollToElement(this.stylistNamesList);
    }

    async clickOnStylistNameMobile() {
        await BrowserActions.clickOnElementMobile(this.stylistNamesList);
    }

    async getStylistNamesList() {
        return await BrowserActions.getTextFromMultipleSelectors(this.stylistNamesList);
    }

    async getRandomStylistNameByIndex(index) {
        return await BrowserActions.getRandomStylistName(this.stylistNamesList, index);
    }

    async clickOnStylistNameByIndex(index) {
        await BrowserActions.clickOnElementByIndex(this.stylistNamesList, index);
    }

    async isUMAPMessageDisplayed() {
        await BrowserActions.waitForElementToAppear(this.umapProduct);
        return await BrowserActions.isElementDisplayed(this.umapProduct);
    }

    async getReviewStarsCheckboxesCount() {
        return await BrowserActions.getElementCount(this.reviewStarsCheckboxes);
    }

    async waitReviewStarsCheckboxesCountMoreThan(number) {
        await BrowserActions.pauseExecutionUntilConditionMet(numberOfElementsToBeMoreThan(
            this.reviewStarsCheckboxes, number));
    }

    async iClickOnReviewStarsCheckboxByIndex(index) {
        await BrowserActions.scrollToElement(this.writeReviewButton);
        if (!await BrowserActions.isDeviceIPhone()) {
            await BrowserActions.scrollByPx(3, -100);
        }
        return await BrowserActions.clickOnElementByIndexMobile(this.reviewStarsCheckboxes, index);
    }

    async getReviewStarsCheckboxPercentageByIndex(index) {
        return await BrowserActions.getTextFromSelectorByIndex(this.reviewStarsPercentage, index);
    }

    async isLimitedTimeSaleDisplayed() {
        await BrowserActions.waitForElementToAppear(this.limitedTimeSaleNCOM);
        return await BrowserActions.isElementDisplayed(this.limitedTimeSaleNCOM);
    }

    async isSearchReviewsDisplayed() {
        await BrowserActions.scrollToElement(this.searchReviewsField);
        return await BrowserActions.isElementDisplayed(this.searchReviewsField);
    }

    async clickSearchReviews() {
        await BrowserActions.clickOnElement(this.searchReviewsField);
    }

    async searchReviewByKeyword(keyword) {
        await BrowserActions.setTextOnElement(this.searchReviewsField, keyword);
        await BrowserActions.pressKeys(["Meta", "Enter"]);
        await BrowserActions.scrollToElement(this.searchReviewsField);
    }

    async searchReviewByKeywordMobile(keyword) {
        await BrowserActions.setTextOnElement(this.searchReviewsField, keyword);
        await BrowserActions.clickOnElementMobile(this.searchReviewsSubmit);
    }

    async getReviewsText() {
        return await BrowserActions.getTextFromMultipleSelectors(this.reviewsText);
    }

    async getReviewsTextMobile() {
        return await BrowserActions.getTextFromMultipleSelectors(this.reviewsTextMobile);
    }

    async isReviewsTextMobileDisplayed() {
        return await BrowserActions.getTextFromMultipleSelectors(this.reviewsTextMobile);
    }

    async isReviewsTextStrongDisplayed() {
        return await BrowserActions.isElementDisplayed(this.reviewsTextStrong);
    }

    async isReviewsTextStrongDisplayedMobile() {
        return await BrowserActions.isElementDisplayed(this.reviewsTextStrongMobile);
    }

    async getReviewsResultsMessageText() {
        return await BrowserActions.getTextFromMultipleSelectors(this.reviewsResultsMessageText);
    }

    async clickViewShoppingBagLink() {
        await BrowserActions.clickOnElement(this.viewShoppingBagLink);
    }

    async clickViewShoppingBagLinkMobile() {
        await BrowserActions.scrollToElement(this.viewShoppingBagLink);
        await BrowserActions.clickOnElementInLoop(this.viewShoppingBagLink, 20);
    }

    async clickViewBagAndCheckoutButton() {
        await BrowserActions.clickOnElementMobile(this.viewBagAndCheckoutButton);
    }

    async isPDPDisplayed() {
        return await BrowserActions.isElementDisplayed(this.pageContainerSelector);
    }

    async getRecTraysTitlesNCOM() {
        await BrowserActions.scrollByPx(200, 30);
        await BrowserActions.scrollToElement(this.recommendationTrayNCOM);
        return await BrowserActions.getTextFromMultipleSelectors(this.recommendationTraysTitlesNCOM);
    }

    async getRecTraysTitlesRACK() {
        await BrowserActions.scrollByPx(200, 30);
        await BrowserActions.scrollToElement(this.recommendationTrayRACK);
        return await BrowserActions.getTextFromMultipleSelectors(this.recommendationTraysTitlesRACK);
    }

    async getRightRecAccordionItemsCountNCOM() {
        return await BrowserActions.getElementCount(this.rightReccommendationAccordionNCOM);
    }

    async getRightRecAccordionItemsCountRACK() {
        return await BrowserActions.getElementCount(this.rightReccommendationAccordionRACK);
    }

    async getRecTrayItemsCountNCOM() {
        return await BrowserActions.getElementCount(this.recommendationTrayItemsNCOM);
    }

    async getRecTrayItemsCountRACK() {
        return await BrowserActions.getElementCount(this.recommendationTrayItemsRACK);
    }

    async checkSizeSelection() {
        if (await BrowserActions.isElementDisplayed(this.productSize)) {
            if (await BrowserActions.getElementCount(this.sizeOptionList) === 0) {
                await BrowserActions.clickOnElement(this.sizeDropdown);
            }
            await BrowserActions.clickRandomElementFilterByText(this.sizeOptionList, "Not available");
        }
    }

    async checkSizeSelectionMobile() {
        if (await BrowserActions.isElementDisplayed(this.productSize)) {
            await BrowserActions.scrollToElement(this.sizeDropdown);
            await BrowserActions.clickOnElementMobile(this.sizeDropdown);
            await BrowserActions.clickRandomElementFilterByText(this.sizeOptionList, "Not available");
        }
    }

    async waitForPurchasesCheckbox() {
        await BrowserActions.waitForElementToAppear(this.verifiedPurchasesCheckbox);
    }

    async isVerifiedPurchasesCheckboxDisplayed() {
        return await BrowserActions.isElementDisplayed(this.verifiedPurchasesCheckbox);
    }

    async clickPurchasesCheckbox() {
        await BrowserActions.clickOnElement(this.verifiedPurchasesCheckbox);
    }

    async clickPurchasesCheckboxMobile() {
        await BrowserActions.scrollToElement(this.writeReviewButton);
        await BrowserActions.scrollToElement(this.verifiedPurchasesCheckbox);
        await BrowserActions.clickOnElementMobile(this.verifiedPurchasesCheckbox);
    }

    async getVerifiedPurchasesReviewLabels() {
        return await BrowserActions.getElementCount(this.verifiedPurchasesReviewLabel);
    }

    async getProductName() {
        return await BrowserActions.getTextFromSelector(this.productName);
    }

    async getProductSelectedSize() {
        return await BrowserActions.getTextFromSelector(this.productSelectedSize);
    }

    async getProductSelectedSizeMobile() {
        if (await BrowserActions.getElementCount(this.productSelectedSizeMobile) > 1) {
            return await (await BrowserActions.getTextFromMultipleSelectors(this.productSelectedSizeMobile))[1];
        } else {
            return await BrowserActions.getTextFromSelector(this.productSelectedSizeMobile);
        }
    }

    async getProductSelectedColor() {
        return await BrowserActions.getAttributeFromSelector(this.productSelectedColor, "title");
    }

    async clickRandomGridItem() {
        await BrowserActions.slowScrollByPx(7, 100);
        const newVar = await BrowserActions.getRandomElementFromCollection(this.looksGridItem);
        await newVar.click();
    }

    async clickLooksAddToBag() {
        await BrowserActions.clickOnElementMobile(this.looksAddToBag);
    }

    async clickColorOption() {
        await BrowserActions.clickOnElementMobile(this.colorOptionsInDropdown);
    }

    async isColorOptionDisplayed() {
        return await BrowserActions.isElementDisplayed(this.colorOptionsInDropdown);
    }

    async isAnniversaryPreviewLabelDisplayed() {
        try {
            await BrowserActions.waitForElementToAppear(this.anniversaryPreviewLabel);
        } catch (e) {
            console.log(e);
        }
        return await BrowserActions.isElementDisplayed(this.anniversaryPreviewLabel);
    }

    async isAnniversaryAccessLabelDisplayed() {
        try {
            await BrowserActions.waitForElementToAppear(this.anniversaryAccessLabel);
        } catch (e) {
            console.log(e);
        }
        return await BrowserActions.isElementDisplayed(this.anniversaryAccessLabel);
    }

    async clickAnniversaryPreviewLink() {
        await BrowserActions.clickOnElementMobile(this.anniversaryPreviewLink);
    }

    async clickAnniversaryAccessLink() {
        await BrowserActions.clickOnElementMobile(this.anniversaryAccessLink);
    }

    async getAnniversaryDialogText() {
        return await BrowserActions.getTextFromSelector(this.anniversaryDialog);
    }

    async clickCloseModalDialog() {
        await BrowserActions.clickOnElementMobile(this.closeAnniversaryDialog);
    }

    async getAnniversaryItemWillBeAvailableText() {
        return await BrowserActions.getTextFromSelector(this.anniversaryItemWillBeAvailable);
    }

    async isAddToBagWithNCardDisplayed() {
        return await BrowserActions.isElementDisplayed(this.addToBagWithNCard);
    }

    async isApplyForNCardDisplayed() {
        return await BrowserActions.isElementDisplayed(this.applyForNCard);
    }

    async isAnniversarySaleLabelDisplayed() {
        return await BrowserActions.isElementDisplayed(this.anniversarySaleLabel);
    }

    async isBeautyExclusiveLabelDisplayed() {
        return await BrowserActions.isElementDisplayed(this.beautyExclusiveLabel);
    }

    async isGroomingExclusiveLabelDisplayed() {
        return await BrowserActions.isElementDisplayed(this.groomingExclusiveLabel);
    }

    async selectFreePickupRadiobutton() {
        await BrowserActions.clickOnElementMobile(this.freePickupRadiobutton);
    }

    async clickStoreLink() {
        await BrowserActions.scrollToElement(this.storeLink);
        await BrowserActions.clickOnElementMobile(this.storeLink);
    }

    async getSelectedStoreName() {
        if (!await BrowserActions.isBrowserSafari() || await BrowserActions.isDeviceIPhone()) {
            return await BrowserActions.getTextFromSelector(this.pdpStoreName);
        } else {
            return await Helpers.trimLastCharacterInString(await BrowserActions.getTextFromSelector(this.pdpStoreName));
        }
    }

    async clickPickupAtThisStore() {
        await BrowserActions.clickOnElementMobile(this.pickupAtThisStore);
    }

    async getPDPPickupStoreName() {
        return await BrowserActions.getTextFromSelector(this.storeLink);
    }

    async addedToWishListMessage() {
        return await BrowserActions.isElementDisplayed(this.addedToWishlistMessage);
    }

    async clickExclusionsApplyLink() {
        await BrowserActions.clickOnElementMobile(this.exclusionsApplyLink);
    }

    async isShippingAndReturnsHolidayDisplayed() {
        return await BrowserActions.isElementDisplayed(this.shippingAndReturnsHoliday);
    }

    async getFreeShippingLabelText() {
        return await BrowserActions.getTextFromSelector(this.freeShippingLabel);
    }

    async isSomeArrivesBeforeChristmasEnticementDisplayed() {
        await BrowserActions.waitForElementToAppear(this.someArrivesBeforeChristmasEnticement);
        return await BrowserActions.isElementDisplayed(this.someArrivesBeforeChristmasEnticement);
    }

    async isSizeSelectionDisplayed() {
        return await BrowserActions.isElementDisplayed(this.productSize);
    }
}
