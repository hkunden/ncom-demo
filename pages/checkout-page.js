import BrowserActions from "../browser-actions";
import Page from "./page";
import Helpers from "../helpers";

export default class CheckoutPage extends Page {
    constructor(...args) {
        super(...args);

        this.addressField = "//div[contains(text(),'Quickly find your address')]";
        this.addressInput = "//input[@name='address']";
        this.addressAutocompleteOptions = "//*[@id='address-modal']/div[2]/div";
        this.email = "//input[@name='email']";
        this.phone = "//input[@name='phone']";
        this.creditCardNumber = "//input[@name='creditCardNumber']";
        this.cardExpirationDate = "//input[@name='cardExpirationDate']";
        this.cardSecurityCode = "//input[@name='securityCode']";
        this.reviewOrderButton = "//button[@aria-label='review-order']";
        this.placeOrderButton = "//button[@aria-label='place-order']";
        this.giftCard = "//span[contains(text(),'Gift Card or Promo Card')]";
        this.giftCardNumber = "//input[@name='number']";
        this.giftCardAccessCode = "//input[@name='accessCode']";
        this.giftCardApply = "//*[@aria-label='Gift Card']//*[contains(text(),'Apply')]";
        this.giftCardAppliedStatus = "//*[contains(text(),'applied')]";
        this.giftCardInOrderSummary = "//*[@aria-label='Order Summary']//*[contains(text(),'Gift Card')]";
        this.addPromoCode = "//span[contains(text(),'Add promo code')]";
        this.promoCode = "//input[@name='promotionCode']";
        this.promoCodeApply = "//*[@id='promotion-code']//*[contains(text(),'Apply')]";
        this.addNordstromNote = "//span[contains(text(),'Add Nordstrom Note')]";
        this.nordstromNoteNumber = "//*[@aria-label='Nordstrom Notes']//*[contains(@name,'number')]";
        this.nordstromNoteCode = "//*[@aria-label='Nordstrom Notes']//*[contains(@name,'accessCode')]";
        this.nordstromNoteApply = "//*[@aria-label='Nordstrom Notes']//*[contains(text(),'Apply')]";
        this.genericCheckoutErrorPath = "/parent::div/following-sibling::p";
        this.freeDelivery = "//h2[text()='Shipping']/parent::div//*[contains(text(),'Free')]";
        this.promotionsSection = "#promotions";
        this.giftWithPurchase = "//*[contains(text(),'Gifts with purchase')]";
        this.estimatedTotal = "//*[contains(text(),'Estimated total')]/span/span";
        this.giftCardDiscount = "//*[contains(text(),'Gift Card')]/span/span";
        this.giftCardUndo = "//*[contains(text(),'Undo')]";
        this.chooseGiftOptionLink = "//*[@id='gift-options']/div/div/p/following-sibling::button";
        this.giftOptionProductSelection = "//*[@type='checkbox']/following-sibling::span";
        this.giftOptionNextButton = "//button[contains(text(),'Next')]";
        this.giftOptionBackButton = "//button[contains(text(),'Back')]";
        this.giftOptionSelection = "//*[@id='gifting-view']//fieldset/label";
        this.giftMessageTo = "//*[@name='to']";
        this.giftMessageFrom = "//*[@name='from']";
        this.giftMessageRecipientEmail = "//*[@name='recipientEmail']";
        this.giftMessageText = "//*[@name='message']";
        this.giftMessageSaveButton = "//*[contains(@type,'button') and contains(text(),'Save')]";
        this.giftOptionMessages = "//*[@id='gift-options']//p";
        this.giftOptionChange = "//*[contains(text(),'Change gift options')]";
        this.giftOptionPrice = "//*[contains(text(),'Gift options')]/span/span";
        this.editShoppingBag = "//*[contains(text(),'Edit Shopping Bag')]";
        this.orderNumber = "//div[contains(text(),'Order #')]";
        this.changeShippingSpeed = "//div[contains(text(),'Change shipping speed')]";
        this.twoDayShipping = "//*[@value='TWO_DAY_SHIPPING']/following-sibling::div";
        this.oneDayShipping = "//*[@value='ONE_DAY_SHIPPING']/following-sibling::div";
        this.chooseTheseOptions = "//*[@id='modal-save']";
        this.shippingPrice = "//*[@id='order-summary']//*[contains(text(),'Shipping')]//*[contains(text(),'$')]";
        this.billingFirstName = "//*[@aria-label='Billing Address']//*[@name='firstName']";
        this.billingAddressSameAsShippingCheckbox = "//*[text()='Same as shipping address']/parent::p";
        this.nordstromNotesSection = "//*[@id='systematic-notes']";
        this.nordstromNotesValue = this.nordstromNotesSection + "/div/div/div/span/span";
        this.nordstromNotesApply = this.nordstromNotesSection + "/div/button";
        this.nordstromNotesAppliedStatus = "//*[contains(text(),'Applied')]";
        this.nordstromNotesInOrderSummary = "//*[@id='order-summary']//*[contains(text(),'Nordstrom Notes')]";
        this.nordstromNotesUndo = "//*[contains(text(),'Undo')]";
        this.freeShipping = "//*[contains(@id,'order-summary')]//*[contains(text(),'Free')]";
        this.shoppingTooltips = "//*[@id='controls-shipping-tooltip-right']";
        this.shoppingTooltipsMobile = "//*[@id='controls-shipping-tooltip-bottom']";
        this.shoppingTooltipText = "//*[@id='shipping-tooltip-right']//p";
        this.shoppingTooltipTextMobile = "//*[@id='shipping-tooltip-bottom']//p";
        this.arrivesBeforeChristmasEnticement = "//*[@id='fulfillment']//*[contains(text(),'Arrives before Christmas')]";
    }

    async open() {
        await super.open("checkout");
    }

    async clickAddressAutocompleteOption() {
        await BrowserActions.clickOnElement(this.addressAutocompleteOptions);
    }

    async inputEmail(email) {
        await BrowserActions.setTextOnElement(this.email, email);
    }

    async inputPhone(phone) {
        await BrowserActions.setTextOnElement(this.phone, phone);
    }

    async inputCreditCardNumber(creditCardNumber) {
        await BrowserActions.setTextOnElement(this.creditCardNumber, creditCardNumber);
    }

    async inputCardExpirationDate(cardExpirationDate) {
        await BrowserActions.setTextOnElement(this.cardExpirationDate, cardExpirationDate);
    }

    async inputCardSecurityCode(cardSecurityCode) {
        await BrowserActions.setTextOnElement(this.cardSecurityCode, cardSecurityCode);
    }

    async clickReviewOrderButton() {
        await BrowserActions.clickOnElementMobile(this.reviewOrderButton);
    }

    async isPlaceOrderButtonDisplayed() {
        return await BrowserActions.isElementDisplayed(this.placeOrderButton);
    }

    async clickPlaceOrderButton() {
        await BrowserActions.clickOnElementMobile(this.placeOrderButton);
    }

    async setGiftCard(cardNumber, accessCode) {
        await BrowserActions.scrollByPx(5, 150);
        await BrowserActions.clickOnElementInLoopWithSelector(this.giftCard, 10, this.giftCardNumber);
        await BrowserActions.setTextOnElement(this.giftCardNumber, cardNumber);
        await BrowserActions.setTextOnElement(this.giftCardAccessCode, accessCode);
        await BrowserActions.clickOnElementMobile(this.giftCardApply);
    }

    async clickApplyGiftCard() {
        await BrowserActions.clickOnElementMobile(this.giftCardApply);
    }

    async getGiftCardAppliedStatus() {
        return await BrowserActions.isElementDisplayed(this.giftCardAppliedStatus);
    }

    async getGiftCardAppliedInOrderSummary() {
        return await BrowserActions.isElementDisplayed(this.giftCardInOrderSummary);
    }

    async setPromoCode(promoCode) {
        await BrowserActions.clickOnElementMobile(this.addPromoCode);
        await BrowserActions.setTextOnElement(this.promoCode, promoCode);
        await BrowserActions.clickOnElementMobile(this.promoCodeApply);
    }

    async setNordstromNote(noteNumber, accessCode) {
        await BrowserActions.clickOnElementMobile(this.addNordstromNote);
        await BrowserActions.setTextOnElement(this.nordstromNoteNumber, noteNumber);
        await BrowserActions.setTextOnElement(this.nordstromNoteCode, accessCode);
        await BrowserActions.clickOnElementMobile(this.nordstromNoteApply);
    }

    async getEmailError() {
        await BrowserActions.clickOnElementMobile(this.phone);
        return await BrowserActions.getTextFromSelector(this.email + this.genericCheckoutErrorPath);
    }

    async getCreditCardError() {
        return await BrowserActions.getTextFromSelector(this.creditCardNumber + this.genericCheckoutErrorPath);
    }

    async getCreditCardExpDateError() {
        return await BrowserActions.getTextFromSelector(this.cardExpirationDate + this.genericCheckoutErrorPath);
    }

    async getCreditCardSecCodeError() {
        return await BrowserActions.getTextFromSelector(this.cardSecurityCode + this.genericCheckoutErrorPath);
    }

    async getGiftCardError() {
        return await BrowserActions.getTextFromSelector(this.giftCardNumber + this.genericCheckoutErrorPath);
    }

    async getPromoCodeError() {
        return await BrowserActions.getTextFromSelector(this.promoCode + this.genericCheckoutErrorPath);
    }

    async getNordNoteError() {
        return await BrowserActions.getTextFromSelector(this.nordstromNoteNumber + this.genericCheckoutErrorPath);
    }

    async waitForFreeDeliveryItems() {
        await BrowserActions.waitForElementToAppear(this.freeDelivery);
    }

    async getFreeDeliveryItemsCount() {
        return await BrowserActions.getElementCount(this.freeDelivery);
    }

    async scrollToPromotions() {
        await BrowserActions.scrollToElement(this.promotionsSection);
    }

    async isGWPDisplayed() {
        return await BrowserActions.isElementDisplayed(this.giftWithPurchase);
    }

    async getEstimatedTotal() {
        return await Helpers.trimAllNonNumericCharactersAsFloat(
            await BrowserActions.getTextFromSelector(this.estimatedTotal));
    }

    async getGiftCardDiscount() {
        return await Helpers.trimAllNonNumericCharactersAsFloat(
            await BrowserActions.getTextFromSelector(this.giftCardDiscount));
    }

    async clickGiftCardUndo() {
        await BrowserActions.clickOnElementMobile(this.giftCardUndo);
    }

    async clickChooseGiftOption() {
        await BrowserActions.scrollToElement(this.chooseGiftOptionLink);
        await BrowserActions.clickOnElementMobile(this.chooseGiftOptionLink);
    }

    async clickChooseGiftOptionMobile() {
        await BrowserActions.clickOnElementMobile(this.chooseGiftOptionLink);
    }

    async chooseGiftOptionProduct() {
        await BrowserActions.clickOnElementMobile(this.giftOptionProductSelection);
    }

    async chooseGiftOptionProductByIndex(index) {
        await BrowserActions.clickOnElementMobile(`//*[@id='gifting-view']//ul/li[${index}]//span`);
    }

    async chooseGiftOptionNext() {
        await BrowserActions.clickOnElementMobile(this.giftOptionNextButton);
    }

    async chooseGiftOptionNextMobile() {
        await BrowserActions.clickOnElementUsingScript(this.giftOptionNextButton);
    }

    async chooseGiftOptionBack() {
        await BrowserActions.clickOnElementMobile(this.giftOptionBackButton);
    }

    async chooseGiftOption(index) {
        await BrowserActions.clickOnElementMobile(this.giftOptionSelection + `[${index}]`);
    }

    async chooseGiftOptionMultiple(index) {
        await BrowserActions.clickOnElementByIndex(this.giftOptionSelection, index - 1);
    }

    async chooseGiftOptionMultipleMobile(index) {
        if (!await BrowserActions.isDeviceIPhone()) {
            await BrowserActions.scrollToElementByIndex(this.giftOptionSelection, index - 1);
        }
        await BrowserActions.clickOnElementByIndexMobile(this.giftOptionSelection, index - 1);
    }

    async getGiftOptionText(index) {
        return await BrowserActions.getTextFromSelector(this.giftOptionSelection + `[${index}]`);
    }

    async getGiftOptionTextMultiple(index) {
        return await BrowserActions.getTextFromSelectorByIndex(this.giftOptionSelection, index - 1);
    }

    async setGiftMessageTo(to) {
        await BrowserActions.setTextOnElement(this.giftMessageTo, to);
    }

    async setGiftMessageFrom(from) {
        await BrowserActions.setTextOnElement(this.giftMessageFrom, from);
    }

    async setGiftMessageRecipientEmail(recipient) {
        await BrowserActions.setTextOnElement(this.giftMessageRecipientEmail, recipient);
    }

    async setGiftMessageText(text) {
        await BrowserActions.setTextOnElement(this.giftMessageText, text);
    }

    async clickGiftMessageSaveButton() {
        await BrowserActions.clickOnElement(this.giftMessageSaveButton);
    }

    async clickGiftMessageSaveButtonMobile() {
        await BrowserActions.clickOnElementUsingScript(this.giftMessageSaveButton);
    }

    async getGiftOptionMessages() {
        await BrowserActions.waitForElementToAppear(this.giftOptionMessages);
        return await BrowserActions.getTextFromMultipleSelectors(this.giftOptionMessages);
    }

    async clickChangeGiftOption() {
        await BrowserActions.clickOnElementMobile(this.giftOptionChange);
    }

    async getGiftOptionPrice() {
        return await BrowserActions.getTextFromSelector(this.giftOptionPrice);
    }

    async waitForEditShoppingBagLink() {
        await BrowserActions.waitForElementToAppear(this.editShoppingBag);
    }

    async isEditShoppingBagLinkDisplayed() {
        return await BrowserActions.isElementDisplayed(this.editShoppingBag);
    }

    async clickEditShoppingBagLink() {
        await BrowserActions.clickOnElementMobile(this.editShoppingBag);
    }

    async waitForOrderNumber() {
        return await BrowserActions.waitForElementToAppear(this.orderNumber);
    }

    async isOrderNumberDisplayed() {
        return await BrowserActions.isElementDisplayed(this.orderNumber);
    }

    async isChangeShippingSpeedDisplayed() {
        return await BrowserActions.isElementDisplayed(this.changeShippingSpeed);
    }

    async clickChangeShippingSpeed() {
        await BrowserActions.clickOnElementMobile(this.changeShippingSpeed);
    }

    async clickTwoDayShipping() {
        await BrowserActions.clickOnElementMobile(this.twoDayShipping);
    }

    async clickOneDayShipping() {
        await BrowserActions.clickOnElementMobile(this.oneDayShipping);
    }

    async clickChooseTheseOptions() {
        await BrowserActions.clickOnElementMobile(this.chooseTheseOptions);
    }

    async clickChooseTheseOptionsMobile() {
        await BrowserActions.clickOnElementUsingScript(this.chooseTheseOptions);
    }

    async getShippingPrice() {
        await BrowserActions.waitForElementToAppear(this.shippingPrice);
        return await Helpers.trimPrice(await BrowserActions.getTextFromSelector(
            this.shippingPrice));
    }

    async isBillingFirstNameDisplayed() {
        await BrowserActions.isElementDisplayed(this.billingFirstName);
    }

    async clickBillingAddressSameAsShipping() {
        await BrowserActions.clickOnElementMobile(this.billingAddressSameAsShippingCheckbox);
    }

    async isNordstromNotesSectionDisplayed() {
        return await BrowserActions.isElementDisplayed(this.nordstromNotesSection);
    }

    async getNordstromNotesValue() {
        return await Helpers.trimAllNonNumericCharactersAsFloat(
            await BrowserActions.getTextFromSelector(this.nordstromNotesValue));
    }

    async clickNordstromNotesApply() {
        await BrowserActions.clickOnElementMobile(this.nordstromNotesApply);
    }

    async isNordstromNotesAppliedStatusDisplayed() {
        return await BrowserActions.isElementDisplayed(this.nordstromNotesAppliedStatus);
    }

    async isNordstromNotesInOrderSummaryDisplayed() {
        return await BrowserActions.isElementDisplayed(this.nordstromNotesInOrderSummary);
    }

    async clickNordstromNotesUndo() {
        await BrowserActions.clickOnElementMobile(this.nordstromNotesUndo);
    }

    async isFreeShippingDisplayed() {
        await BrowserActions.waitForElementToAppear(this.freeShipping);
        return await BrowserActions.isAnyElementDisplayed(this.freeShipping);
    }

    async getShippingPriceCheckout() {
        await BrowserActions.waitForElementToAppear(this.shippingPrice);
        return await BrowserActions.getTextFromSelector(this.shippingPrice);
    }

    async getShippingTooltipText() {
        if (await BrowserActions.isBrowserSafari()) {
            await BrowserActions.mouseOverElementSafari(this.shoppingTooltips);
        } else {
            await BrowserActions.mouseOverElement(this.shoppingTooltips);
        }
        return await BrowserActions.getTextFromSelector(this.shoppingTooltipText);
    }

    async getShippingTooltipTextMobile() {
        await BrowserActions.clickOnElementMobile(this.shoppingTooltipsMobile);
        return await BrowserActions.getTextFromSelector(this.shoppingTooltipTextMobile);
    }

    async isArrivesBeforeChristmasEnticementDisplayed() {
        await BrowserActions.waitForElementToAppear(this.arrivesBeforeChristmasEnticement);
        return await BrowserActions.isElementDisplayed(this.arrivesBeforeChristmasEnticement);
    }
}
