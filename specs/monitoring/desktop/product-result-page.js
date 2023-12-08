/* eslint-disable no-undef */
import ProductResultsPage from "../../../pages/product-results-page";
import SpecHelper from "../../helper";

describe(`Product Results Page [${os}]`, () => {
    context("Product Results Page", () => {
        it("should navigate to Browse Page", async () => {
            const helper = new SpecHelper();
            const productResultsPage = new ProductResultsPage(global.baseUrl);

            await helper.navigateFromHomeToProductCategpry();
            await productResultsPage.checkForCoreComponents();
        });
    });
});
