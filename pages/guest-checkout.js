import Page from "./page";
import BrowserActions from "../browser-actions";

export default class GuestCheckoutPage extends Page {
    constructor (...args) {
        super(...args);
        this.guestCheckoutButtonSelector = "button=Guest Checkout";
        this.firstNameFieldSelector = "input[name='firstName']";
        this.lastNameFieldSelector = "input[name='lastName']";
        this.quickAddressFieldSelector = "div=Quickly find your address";
        this.addressLine1FieldSelector = "input[name='addressLine1']";
        this.addressLine2FieldSelector = "input[name='addressLine2']";
        this.cityFieldSelector = "input[name='city']";
        this.stateFieldSelector = "input[name='state']";
        this.postalCodeFieldSelector = "input[name='postalCode']";
        this.quickAddressInputSelector = "input[name='address']";
        this.enterAddressManuallyButtonSelector = "button=Enter address manually";
    }

    async checkoutAsGuest() {
        await BrowserActions.clickOnElement(this.guestCheckoutButtonSelector);
    }

    async fillOutNameAndAddress (firstName, lastName, address1, address2, city, state, postalCode) {
        await BrowserActions.clickOnElement(this.quickAddressFieldSelector);
        await BrowserActions.setTextOnElement(this.quickAddressInputSelector, "address");
        await BrowserActions.pauseExecution(500);
        await BrowserActions.clickOnElement(this.enterAddressManuallyButtonSelector);
        await BrowserActions.setTextOnElement(this.firstNameFieldSelector, firstName);
        await BrowserActions.setTextOnElement(this.lastNameFieldSelector, lastName);
        await BrowserActions.setTextOnElement(this.addressLine1FieldSelector, address1);
        await BrowserActions.setTextOnElement(this.addressLine2FieldSelector, address2);
        await BrowserActions.setTextOnElement(this.cityFieldSelector, city);
        await BrowserActions.setTextOnElement(this.stateFieldSelector, state);
        await BrowserActions.setTextOnElement(this.postalCodeFieldSelector, postalCode);
    }
}
