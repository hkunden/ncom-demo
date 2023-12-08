/* global $, $$, browser */
import Homepage from "../pages/homepage";
import ProductResultsPage from "../pages/product-results-page";

export default class SpecHelper {
    constructor() {
    }

    async navigateFromHomeToProductCategpry() {
        const homePage = new Homepage(global.baseUrl);

        await homePage.open();
        await homePage.navigateToProductCategory("Women", "Jewelry");
        await browser.waitUntil(
            () => browser.execute(() => document.readyState === "complete"),
            {
                timeout: 60000,
                timeoutMsg: "Failed to navigate to Product Category."
            }
        );
    }

    async navigateFromHomeToProductCategpryMobile() {
        const homepage = new Homepage(global.baseUrl);
        await homepage.open();

        await homepage.navigateToProductCategoryMobile();
    }

    async openProductPageByBrowsing() {
        const productResultsPage = new ProductResultsPage(global.baseUrl);

        await this.navigateFromHomeToProductCategpry();
        await productResultsPage.clickRandomProduct();
    }

    async openProductPageByBrowsingMobile() {
        const productResultsPage = new ProductResultsPage(global.baseUrl);

        let foundProductResultsPage = false;
        for (let index = 0; index < 3; index++) {
            await this.navigateFromHomeToProductCategpryMobile();
            try {
                /* eslint-disable object-curly-spacing */
                await $(productResultsPage.firstProductSelector).waitForExist({ timeout: 60000 });
                foundProductResultsPage = true;
                break;
            } catch (error) {
                console.log("Did not browse to Product Results page. Retrying.");
            }
        }

        if (!foundProductResultsPage) {
            throw new Error("Could not navigate to Product Results Page.");
        }
        else {
            console.log("Found Product Results page.");
        }

        await productResultsPage.clickRandomProduct();
    }
}
