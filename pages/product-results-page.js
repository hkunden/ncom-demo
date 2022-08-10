import BrowserActions from "../browser-actions";
import Page from "./page";

export default class ProductResultsPage extends Page {
    constructor(...args) {
        super(...args);

        this.pageContainerSelector = "#product-results-view";
        this.allProductsSelector = "article h3 a";
    }

    async checkForCoreComponents() {
        await BrowserActions.waitForElementToAppear(this.pageContainerSelector);
    }
}
