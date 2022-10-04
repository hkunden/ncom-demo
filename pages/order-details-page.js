import BrowserActions from "../browser-actions";
import Page from "./page";

export default class OrderDetailsPage extends Page {
    constructor(...args) {
        super(...args);

        this.cancelOrderButtonSelector = "[aria-controls='cancel-order-popover']";
        this.returnToPurchasesLinkSelector = "span=All purchase";
    }

    async returnToMyAccountPage() {
        await BrowserActions.clickOnElement(this.returnToPurchasesLinkSelector);
    }
}
