/* eslint-disable no-undef */
import ProductResultsPage from "../../../pages/product-results-page";
import SpecHelper from "../../helper";

describe(`Product Results Page [${os}]`, () => {
    const urlPath = global.baseUrl.includes("rack") ? "shop/women/jewelry" : "browse/women/jewelry";

    context("Product Results Page", () => {
        it("should load the Product Resuls Page", async () => {
            const helper = new SpecHelper();
            const productResultsPage = new ProductResultsPage(global.baseUrl);

            await helper.navigateFromHomeToProductCategpryMobile();
            await productResultsPage.checkForCoreComponents();
        });
    });
});
