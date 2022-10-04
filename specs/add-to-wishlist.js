/* eslint-disable no-undef */
import ProductDetailPage from "../pages/product-detail-page";

describe(`Add to Wishlist [${os}]`, () => {
    const productDetailPage = new ProductDetailPage(global.baseUrl);

    context("when the shopper is not authenticated", () => {
        it("should successfuly prompt them to sign in", async () => {
            await productDetailPage.open(process.env.CHECKOUT_PRODUCT_ID);
            await productDetailPage.addToWishlist();
        });
    });
});
