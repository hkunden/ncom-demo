/* eslint-disable no-undef */
import ProductResultsPage from "../pages/product-results-page";

describe(`Navigating to a Product Results Page from the Homepage [${os}]`, () => {
    const urlPath = global.baseUrl.includes("rack") ? "shop/women/jewelry" : "browse/women/jewelry";

    it("should load the Product Resuls Page for Jewelry", async () => {
        const productResultsPage = new ProductResultsPage(global.baseUrl);

        await productResultsPage.open(urlPath);
        await productResultsPage.checkForCoreComponents();

    });
});
