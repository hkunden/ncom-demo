/* global $, $$, browser */
import BrowserActions from "../browser-actions";
import Page from "./page";

export default class ProductResultsPage extends Page {
    constructor(...args) {
        super(...args);

        this.pageContainerSelector = "#product-results-view";
        this.allProductsSelector = "#product-results-view article h3 a";
        this.firstProductSelector = "#product-results-view article:nth-child(1) > h3 > a";
    }

    async checkForCoreComponents() {
        await BrowserActions.waitForElementToAppear(this.pageContainerSelector);
    }

    async clickFirstProduct() {
        const product = await $(this.firstProductSelector);
        await product.click();
    }

    async clickRandomProduct() {
        let product = await BrowserActions.getRandomElementFromCollection(this.allProductsSelector);
        let productCount = 0;
        while (!product) {
            product = await BrowserActions.getRandomElementFromCollection(this.allProductsSelector);
            if (productCount > 5) {
                break;
            }
            productCount++;
        }

        await product.scrollIntoView();
        const productName = await product.getText();
        console.log(`Clicking ${productName}`);
        await product.click();
        await browser.waitUntil(
            () => browser.execute(() => document.readyState === "complete"),
            {
                timeout: 60000,
                timeoutMsg: `Failed to navigate to ${productName}`
            }
        );
    }
}
