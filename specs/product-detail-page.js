/* eslint-disable no-undef */
import ProductDetailPage from "../pages/product-detail-page";

describe(`Validating PDP Page Functionality [${os}]`, () => {
    const productDetailPage = new ProductDetailPage(global.baseUrl);

    before(async () => {
        await productDetailPage.open(process.env.PRODUCT_ID);
    });

    it("should load the page", async () => {
        await productDetailPage.checkForCoreComponents();
    });

    it("should load a recommendations shelf", async () => {
        await productDetailPage.scrollThroughRecShelf();
    });
});
