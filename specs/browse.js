/* eslint-disable no-undef */
import Homepage from "../pages/homepage";
import ProductResultsPage from "../pages/product-results-page";

describe(`Navigating to a Product Results Page from the Homepage [${os}]`, () => {
    it("should navigate to PDP Page", async () => {
        const homePage = new Homepage(global.baseUrl);
        const productResultsPage = new ProductResultsPage(global.baseUrl);

        await homePage.open();
        await homePage.navigateToProductCategory("Women", "Jewelry");
        await productResultsPage.checkForCoreComponents();

    });
});
