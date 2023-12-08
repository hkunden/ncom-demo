/* eslint-disable no-undef */
import ProductDetailPage from "../../../pages/product-detail-page";
import SpecHelper from "../../helper";

describe(`Product Detail Page [${os}]`, () => {
    context("Product Detail Page", () => {
        it("should load the page and verify recommendations shelf", async () => {
            const productDetailPage = new ProductDetailPage(global.baseUrl);
            const helper = new SpecHelper();

            await helper.openProductPageByBrowsing();

            await productDetailPage.checkForCoreComponents();

            await productDetailPage.scrollThroughRecShelf();
        });
    });
});
