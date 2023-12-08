import Page from "./page";
import BrowserActions from "../browser-actions";
import _ from "lodash";
import Helpers from "../helpers";

export default class ShoppingBagPage extends Page {
    constructor(...args) {
        super(...args);
        this.refreshCount = 0;
        this.miniBag = "//*[@id='controls-shopping-bag-popover']/span";
        this.miniBagMobile = "//*[@id='layer-4']//div/a[3]/span";
        this.miniBagPopover = "#shopping-bag-popover";
        this.shoppingBagHeading = "#shopping-bag-header-content";
        this.saveForLaterHeading = "//*[@id='shopping-bag-header-content']/following-sibling::div//h1";
        this.shippingInternationallyLink = "//*[contains(text(),'International Shipping')]";
        this.intBrandRestrictedItemMessage = "//*[@id='delivery-items']//li/div[2]/div";
        this.shoppingBagItem = "#shopping-bag-item";
        this.productImage = "//*[@id='shopping-bag-item']//img";
        this.soldOutSectionTitle = "//*[contains(text(),'Sold out')]";
        this.shoppingBagQuantity = "//*[@id='controls-shopping-bag-popover']/span";
        this.shoppingBagQuantityMobile = "//*[@id='layer-4']//span/span/span";
        this.signedOutShoppingBagQuantityMobile = "//*[@id='layer-4']//span/span/span";
        this.removeProductFromMinbag = "//*[@id='shopping-bag-popover']//button";
        this.subtotalPrice = "//*[contains(text(),'Subtotal')]/following-sibling::span/span";
        this.shoppingBagisEmptyMessage = "//*[text()='Your bag is empty']";
        this.removeItemButton = "//*[@id='shopping-bag-item']//*[contains(text(),'Remove')]";
        this.productBrand = "//*[@id='item-details']/div[2]/div[1]";
        this.productName = "//*[@id='item-details']/div[2]/div[2]";
        this.productSizeAndColor = "//*[@id='item-details']/div[3]";
        this.productPrice = "//*[@id='item-pricing']//strong/span";
        this.salePrice = "//*[@id='item-pricing']//*[contains(text(),'Now')]";
        this.beforeSalePrice = "//*[@id='item-pricing']//*[contains(text(),'Was')]";
        this.saveForLater = "//*[@id='shopping-bag-item']//*[contains(text(),'Save for later')]";
        this.savedForLaterTab = "//*[@id='shopping-bag-header-content']//*[contains(text(),'Saved for Later')]";
        this.savedForLaterTabOld = "//*[@id='shopping-bag-toggle']//*[contains(text(),'Saved for Later')]";
        this.shoppingBagTab = "//button[contains(text(),'Shopping Bag')]";
        this.savedForLaterTabMobile = "//*[contains(text(),'Saved for Later')]";
        this.saveForLaterItem = "//*[@id='saved-for-later-item']";
        this.moveToBag = "//*[@id='saved-for-later-item']//*[contains(text(),'Move to bag')]";
        this.removeFromSaveForLater = "//*[@id='saved-for-later-item']//*[contains(text(),'Remove')]";
        this.shoppingBagException = "//*[@id='shopping-bag-exception']";
        this.weShipInternationallyDialog = "//*[@id='modalTitle']";
        this.countries = "//*[contains(text(),'Ship to')]/parent::label/select/option";
        this.currencies = "//*[contains(text(),'Shop in')]/parent::label/select/option";
        this.priceEach = "//*[contains(text(),'$')]/parent::strong/following-sibling::span";
        this.itemQuantityDropdown = "#item-quantity";
        this.youHaveNoSavedItems = "//*[contains(text(),'You have no saved items')]";
        this.checkoutButton = "//*[contains(text(),'Check Out')]";
        this.editShoppingBagLinkCheckout = "#edit-shopping-bag-link";
        this.anniversarySaleLabel = "//*[@id='item-details']//*[contains(text(),'Anniversary Sale')]";
        this.peopleAlsoViewedNCOM = "#product-recommendations-shelf-sb-1-test";
        this.peopleAlsoViewedRACK = "#product-recommendations-shelf-shoppingbag1";
        this.shippingZipCode = "#controls-delivery-postal-code-popover > div > a";
        this.shippingZipCodeMobile = "//*[@id='delivery-items']//div/a";
        this.zipCodeFormInput = "#postal-code-form-input";
        this.zipCodeFormApply = "#postal-code-form-submit";
        this.changeAlToPickup = "//*[contains(text(),'Change all to pickup')]";
        this.pickUpNItems = "//*[contains(text(),'Pickup (')]";
        this.changeAlToShipping = "//*[contains(text(),'Change all to shipping')]";
        this.shippingNItems = "//*[contains(text(),'Shipping (')]";
        this.freePickupStoreLink = "//*[@id='pickup-items']//div[1]/a";
        this.storeZipCodeFormInput = "//*[@name='postalCode']";
        this.findNearbyStoresButton = "//*[@id='pickup-stores-view']//*[text()='Find Nearby Stores']";
        this.chooseThisStore = "#modal-save";
        this.storeName = "//*[@id='pickup-stores-view']//label/div/div/div[1]/div";
        this.progressBar39Shipping = "//*[@role='progressbar']/parent::div/preceding-sibling::div";
        this.freeShipping = "//*[contains(text(),'Order summary')]/parent::div//*[contains(text(),'Free')]";
        this.shippingTooltip = "//*[@id='controls-shipping-tooltip-']";
        this.shippingTooltipText = "//*[@id='shipping-tooltip-']//p";
        this.shippingPrice = "//*[@id='controls-shipping-tooltip-']/parent::div/following-sibling::span/span";
        this.arrivesBeforeChristmasEnticement = "//*[@id='delivery-items']//*[contains(text(),'Arrives before Christmas')]";
    }

    async open() {
        await super.open("shopping-bag");
    }

    async hoverOverMiniBag() {
        if (!await BrowserActions.isBrowserSafari()) {
            await BrowserActions.mouseOverElement(this.miniBag);
        } else {
            await BrowserActions.scrollToElement(this.miniBag);
            await BrowserActions.mouseOverElementSafari(this.miniBag);
        }
    }

    async clickOnMiniBag() {
        await BrowserActions.clickOnElement(this.miniBag);
    }

    async isShoppingBagHeadingDisplayed() {
        await BrowserActions.waitForElementToAppear(this.shoppingBagHeading);
        return await BrowserActions.isElementDisplayed(this.shoppingBagHeading);
    }

    async getSaveForLaterHeading() {
        return await BrowserActions.getTextFromSelector(this.saveForLaterHeading);
    }

    async isYouHaveNoSavedItemsHeadingDisplayed() {
        return await BrowserActions.isElementDisplayed(this.youHaveNoSavedItems);
    }

    async getYouHaveNoSavedItemsHeadingText() {
        return await BrowserActions.getTextFromSelector(this.youHaveNoSavedItems);
    }

    async clickOnMiniBagMobile() {
        await BrowserActions.clickOnElementMobile(this.miniBagMobile);
    }

    async clickShippingInternationallyLink() {
        await BrowserActions.scrollByPx(1, 100);
        if (!await BrowserActions.isBrowserSafari()) {
            await BrowserActions.clickOnElement(this.shippingInternationallyLink);
        } else {
            await BrowserActions.clickOnElementMobile(this.shippingInternationallyLink);
        }
        await BrowserActions.waitForElementToAppear(this.welcomeModalHeaderSelector);
    }

    async selectShippingCountry(countryCode) {
        await BrowserActions.selectDropdownOptionByValue(this.shippingCountryDropdownSelector, countryCode);
        await BrowserActions.clickOnElement(this.saveShippingPreferencesButtonSelector);
        await BrowserActions.waitForElementToAppear(this.internationalShippingModalHeader);
        await BrowserActions.clickOnElement(this.closeModalLinkSelector);
        await BrowserActions.waitForElementToDisappear(this.internationalShippingModalHeader);
    }

    async clickShippingInternationallyLinkMobile() {
        await BrowserActions.scrollByPx(8, 100);
        await BrowserActions.clickOnElementMobile(this.shippingInternationallyLink);
        await BrowserActions.waitForElementToAppear(this.welcomeModalHeaderSelector);
    }

    async selectShippingCountryMobile(countryCode) {
        await BrowserActions.selectDropdownOptionByValue(this.shippingCountryDropdownSelector, countryCode);
        await BrowserActions.clickOnElementMobile(this.saveShippingPreferencesButtonSelector);
        await BrowserActions.waitForElementToAppear(this.internationalShippingModalHeader);
        await BrowserActions.clickOnElementMobile(this.closeModalLinkSelector);
        await BrowserActions.waitForElementToDisappear(this.internationalShippingModalHeader);
    }

    async getTextFromCountriesDropdown() {
        return await BrowserActions.getTextFromMultipleSelectors(this.countries);
    }

    async getTextFromCurrenciesDropdown() {
        return await BrowserActions.getTextFromMultipleSelectors(this.currencies);
    }

    async getIntBrandRestrictedItemMessageText() {
        return await BrowserActions.getTextFromSelector(this.intBrandRestrictedItemMessage);
    }

    async waitForShoppingBagItemToAppear() {
        try {
            await BrowserActions.waitForElementToAppear(this.shoppingBagItem);
        } catch (e) {
            this.refreshCount++;
            await BrowserActions.refreshPage();
            await BrowserActions.pauseExecution(500);
            if (this.refreshCount < 4) {
                await this.waitForShoppingBagItemToAppear();
            }
        }
    }

    async isShoppingBagItemDisplayed() {
        return await BrowserActions.isElementDisplayed(this.shoppingBagItem);
    }

    async getMinibagPopoverMessageText() {
        return await BrowserActions.getTextFromSelector(this.miniBagPopover);
    }

    async clickProductImage() {
        await BrowserActions.clickOnElement(this.productImage);
    }

    async clickProductImageMobileNCOM() {
        await BrowserActions.scrollToElement(this.productImage);
        await BrowserActions.touchElementMobile(this.productImage, 55);
    }

    async clickProductImageMobileRACK() {
        if (await BrowserActions.isDeviceIPhone() === true) {
            await BrowserActions.scrollToElement(this.productImage);
            await BrowserActions.touchElementMobile(this.productImage, 85);
        } else {
            await BrowserActions.scrollToElement(this.productImage);
            await BrowserActions.touchElementMobileXY(this.productImage, 30, -100);
        }
    }

    async isSoldOutTitleDisplayed() {
        await BrowserActions.waitForElementToAppear(this.soldOutSectionTitle);
        return await BrowserActions.isElementDisplayed(this.soldOutSectionTitle);
    }

    async getShoppingBagQuantity() {
        await BrowserActions.scrollToElement(this.miniBag);
        return await BrowserActions.getTextFromSelector(this.shoppingBagQuantity);
    }

    async getShoppingBagQuantityMobile() {
        await BrowserActions.scrollByPx(9, -100);
        return await BrowserActions.getTextFromSelector(this.shoppingBagQuantityMobile);
    }

    async removeProductFromMiniBag() {
        await BrowserActions.clickOnElementMobile(this.removeProductFromMinbag);
    }

    async getItemPrices() {
        const itemPrices = await BrowserActions.getTextFromMultipleSelectors(this.productPrice);
        return _.compact(await Promise.all(
            _.map(itemPrices, async (element) => await Helpers.trimPrice(element))));
    }

    async getSubtotalPrice() {
        return await Helpers.trimPrice(await BrowserActions.getTextFromSelector(this.subtotalPrice));
    }

    async getShoppingBagItemCounter() {
        await BrowserActions.pauseExecution(1000);
        await BrowserActions.scrollByPx(5, 100);
        return BrowserActions.getElementCount(this.shoppingBagItem);
    }

    async isShoppingBagSectionDisplayed() {
        await BrowserActions.waitForElementToAppear(this.shoppingBagisEmptyMessage);
        return await BrowserActions.isElementDisplayed(this.shoppingBagisEmptyMessage);
    }

    async getSignedOutShoppingBagQuantityMobile() {
        await BrowserActions.scrollByPx(9, -100);
        return await BrowserActions.getTextFromSelector(this.signedOutShoppingBagQuantityMobile);
    }

    async removeAllItemsFromBag() {
        await BrowserActions.pauseExecution(1000);
        const itemCount = await BrowserActions.getElementCount(this.removeItemButton);
        for (let i = 0; i < itemCount * 2; i++) {
            if (!await BrowserActions.isElementDisplayed(this.removeItemButton)) {
                break;
            }
            await BrowserActions.clickOnElementMobile(this.removeItemButton);
            await BrowserActions.pauseExecution(500);
        }
    }

    async removeAllItemsFromBagMobile() {
        for (let i = 0; i < 15; i++) {
            if (!await BrowserActions.isElementDisplayed(this.removeItemButton)) {
                break;
            }
            await BrowserActions.scrollToElement(this.removeItemButton);
            await BrowserActions.pauseExecution(500);
            await BrowserActions.scrollByPx(3, 150);
            await BrowserActions.pauseExecution(500);
            await BrowserActions.clickOnElementInLoop(this.removeItemButton, 20);
            await BrowserActions.pauseExecution(500);
        }
    }

    async getProductName() {
        return await BrowserActions.getTextFromSelector(this.productName);
    }

    async getProductNames() {
        return await BrowserActions.getTextFromMultipleSelectors(this.productName);
    }

    async getProductBrand() {
        return await BrowserActions.getTextFromSelector(this.productBrand);
    }

    async getProductSizeAndColor() {
        return await BrowserActions.getTextFromSelector(this.productSizeAndColor);
    }

    async getProductPrice() {
        return await BrowserActions.getTextFromSelector(this.productPrice);
    }

    async isSalePriceDisplayed() {
        try {
            await BrowserActions.waitForElementToAppear(this.salePrice);
        } catch (e) {
            console.log(e);
        }
        return await BrowserActions.isElementDisplayed(this.salePrice);
    }

    async isBeforeSalePriceDisplayed() {
        await BrowserActions.waitForElementToAppear(this.beforeSalePrice);
        return await BrowserActions.isElementDisplayed(this.beforeSalePrice);
    }

    async clickSaveForLater() {
        await BrowserActions.clickOnElementMobile(this.saveForLater);
    }

    async clickSavedForLaterTabOld() {
        await BrowserActions.clickOnElementMobile(this.savedForLaterTabOld);
    }

    async clickSaveForLaterMobile() {
        await BrowserActions.clickOnElementInLoop(this.saveForLater, 20);
    }

    async isSaveForLaterDisplayed() {
        return await BrowserActions.isElementDisplayed(this.saveForLater);
    }

    async isSavedForLaterTabDisplayed() {
        return await BrowserActions.isElementDisplayed(this.savedForLaterTab);
    }

    async clickSavedForLaterTab() {
        await BrowserActions.clickOnElementMobile(this.savedForLaterTab);
    }

    async clickSavedForLaterTabMobile() {
        await BrowserActions.clickOnElementInLoopWithSelector(this.savedForLaterTabMobile, 20, this.saveForLaterItem);
    }

    async clickShoppingBagLaterTab() {
        await BrowserActions.clickOnElementMobile(this.shoppingBagTab);
    }

    async clickShoppingBagLaterTabMobile() {
        await BrowserActions.clickOnElementInLoopWithSelector(this.shoppingBagTab, 20, this.saveForLater);
    }

    async isSaveForLaterItemDisplayed() {
        await BrowserActions.waitForElementToAppear(this.saveForLaterItem);
        return await BrowserActions.isElementDisplayed(this.saveForLaterItem);
    }

    async clickMoveToBag() {
        await BrowserActions.clickOnElementMobile(this.moveToBag);
    }

    async clickMoveToBagMobile() {
        await BrowserActions.scrollToElement(this.moveToBag);
        await BrowserActions.clickOnElementInLoop(this.moveToBag, 10);
    }

    async clickRemoveFromSaveForLater() {
        await BrowserActions.clickOnElementMobile(this.removeFromSaveForLater);
    }

    async clickRemoveFromSaveForLaterMobile() {
        await BrowserActions.clickOnElementInLoop(this.removeFromSaveForLater, 20);
    }

    async getShoppingBagExceptionText() {
        return await BrowserActions.getTextFromSelector(this.shoppingBagException);
    }

    async getWeShipInternationallyDialogText() {
        return await BrowserActions.getTextFromSelector(this.weShipInternationallyDialog);
    }

    async getEachPrice() {
        return await BrowserActions.getTextFromSelector(this.priceEach);
    }

    async setItemQuantity(quantity) {
        await BrowserActions.selectDropdownOptionByValueMobile(this.itemQuantityDropdown, quantity);
    }

    async clickCheckoutButton() {
        await BrowserActions.clickOnElementMobile(this.checkoutButton);
    }

    async waitForEditShoppingBagLinkCheckoutToAppear() {
        await BrowserActions.waitForElementToAppear(this.editShoppingBagLinkCheckout);
    }

    async isAnniversarySaleSBLabelDisplayed() {
        return await BrowserActions.isElementDisplayed(this.anniversarySaleLabel);
    }

    async isPeopleAlsoViewedNCOMDisplayed() {
        await BrowserActions.waitForElementToAppear(this.peopleAlsoViewedNCOM);
        return await BrowserActions.isAnyElementDisplayed(this.peopleAlsoViewedNCOM);
    }

    async isPeopleAlsoViewedRACKDisplayed() {
        await BrowserActions.waitForElementToAppear(this.peopleAlsoViewedRACK);
        return await BrowserActions.isAnyElementDisplayed(this.peopleAlsoViewedRACK);
    }

    async clickShippingZipCode() {
        await BrowserActions.clickOnElement(this.shippingZipCode);
    }

    async getZipCode() {
        return await BrowserActions.getTextFromSelector(this.shippingZipCode);
    }

    async getZipCodeMobile() {
        return await BrowserActions.getTextFromSelector(this.shippingZipCodeMobile);
    }

    async clearZipCodeValue() {
        await BrowserActions.clearTextValue(this.zipCodeFormInput);
    }

    async setZipcodeValue(zipCode) {
        await BrowserActions.setTextOnElement(this.zipCodeFormInput, zipCode);
    }

    async clickZipcodeFormApply() {
        await BrowserActions.clickOnElementMobile(this.zipCodeFormApply);
    }

    async clickShippingZipCodeMobile() {
        await BrowserActions.clickOnElementMobile(this.shippingZipCodeMobile);
    }

    async clickChangeAlToPickup() {
        await BrowserActions.clickOnElementMobile(this.changeAlToPickup);
    }

    async getPickupMessageItemsCount() {
        return await Helpers.trimAllNonNumericCharactersAsFloat(
            await BrowserActions.getTextFromSelector(this.pickUpNItems));
    }

    async clickChangeAllToShipping() {
        await BrowserActions.clickOnElementMobile(this.changeAlToShipping);
    }

    async getShippingMessageItemsCount() {
        return await Helpers.trimAllNonNumericCharactersAsFloat(
            await BrowserActions.getTextFromSelector(this.shippingNItems));
    }

    async clickFreePickupStoreLink() {
        await BrowserActions.clickOnElementMobile(this.freePickupStoreLink);
    }

    async clearStoreZipCodeValue() {
        await BrowserActions.clearTextValueWithPressKeys(this.storeZipCodeFormInput);
    }

    async setStoreZipcodeValue(zipCode) {
        await BrowserActions.setTextOnElement(this.storeZipCodeFormInput, zipCode);
    }

    async clickFindNearByStoresButton() {
        await BrowserActions.clickOnElementMobile(this.findNearbyStoresButton);
    }

    async clickChooseThisStore() {
        await BrowserActions.clickOnElementMobile(this.chooseThisStore);
    }

    async getStoreName() {
        return await BrowserActions.getTextFromSelector(this.storeName);
    }

    async getPickupStoreName() {
        return await BrowserActions.getTextFromSelector(this.freePickupStoreLink);
    }

    async setPickUpByIndex(index) {
        return await BrowserActions.clickOnElementMobile(
            `//*[@id='delivery-items']//ul/li[${index}]//*[@value='pickup']/parent::label`);
    }

    async removeProductFromBagMobile() {
        await BrowserActions.scrollByPx(8, 100);
        await BrowserActions.clickOnElementMobile(this.removeItemButton);
    }

    async getProgressBar39ShippingText() {
        return await BrowserActions.getTextFromSelector(this.progressBar39Shipping);
    }

    async isFreeShippingDisplayed() {
        return await BrowserActions.isElementDisplayed(this.freeShipping);
    }

    async getShippingPrice() {
        return await BrowserActions.getTextFromSelector(this.shippingPrice);
    }

    async getShippingTooltipText() {
        if (await BrowserActions.isBrowserSafari()) {
            await BrowserActions.mouseOverElementSafari(this.shippingTooltip);
        } else {
            await BrowserActions.mouseOverElement(this.shippingTooltip);
        }
        return await BrowserActions.getTextFromSelector(this.shippingTooltipText);
    }

    async getShippingTooltipTextMobile() {
        await BrowserActions.clickOnElementMobile(this.shippingTooltip);
        return await BrowserActions.getTextFromSelector(this.shippingTooltipText);
    }

    async isArrivesBeforeChristmasEnticementDisplayed() {
        await BrowserActions.waitForElementToAppear(this.arrivesBeforeChristmasEnticement);
        return await BrowserActions.isElementDisplayed(this.arrivesBeforeChristmasEnticement);
    }
}
