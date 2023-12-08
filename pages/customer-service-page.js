import BrowserActions from "../browser-actions";
import Page from "./page";

export default class CustomerServicePage extends Page {
    constructor(...args) {
        super(...args);

        this.intShoppingLink = "//*[contains(@id,'anchor-link-shipping-charges')]//*[contains(text(),'International shipping')]";
        this.checkOrderstatus = "//*[@aria-labelledby='page-navigation']//*[contains(text(),'Check Order Status')]";
        this.orderNumberField = "//*[@id='order-lookup']//*[@name='orderNumber']";
        this.zipCodeField = "//*[@id='order-lookup']//*[@name='billingZipCode']";
        this.startYourReturn = "//*[@id='product-results-view']//*[@title='Start Your Return']";
        this.returnOrderNumberField = "//*[@id='layer-0']//*[@name='orderId']";
        this.returnZipCodeField = "//*[@id='layer-0']//*[@name='postalCode']";
        this.holidayShipping = "//p[contains(text(),'Standard Shipping on')]";
        this.holidayShippingMobile = "//*[contains(text(),'This item qualifies for free')]";
    }

    async isIntShoppingLinkDisplayed() {
        return await BrowserActions.isElementDisplayed(this.intShoppingLink);
    }

    async waitForIntShoppingLinkToAppear() {
        return await BrowserActions.waitForElementToAppear(this.intShoppingLink);
    }

    async isOrderNumberFieldDisplayed() {
        return await BrowserActions.isElementDisplayed(this.orderNumberField);
    }

    async isZipCodeFieldDisplayed() {
        return await BrowserActions.isElementDisplayed(this.zipCodeField);
    }

    async isReturnOrderNumberDisplayed() {
        return await BrowserActions.isElementDisplayed(this.returnOrderNumberField);
    }

    async isReturnZipCodeFieldDisplayed() {
        return await BrowserActions.isElementDisplayed(this.returnZipCodeField);
    }

    async waitReturnOrderFieldToAppear() {
        return await BrowserActions.waitForElementToAppear(this.returnOrderNumberField);
    }

    async clickStartYourReturnLink() {
        await BrowserActions.scrollToElement(this.startYourReturn);
        await BrowserActions.clickOnElementMobile(this.startYourReturn);
    }

    async clickStartYourReturnLinkMobile() {
        await BrowserActions.scrollToElement(this.startYourReturn);
        await BrowserActions.clickOnElementMobile(this.startYourReturn);
    }

    async getHolidayShippingText() {
        return await BrowserActions.getTextFromSelector(this.holidayShipping);
    }

    async getHolidayShippingTextMobile() {
        return await BrowserActions.getTextFromSelector(this.holidayShippingMobile);
    }
}
