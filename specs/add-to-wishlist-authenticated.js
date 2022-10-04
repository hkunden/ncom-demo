/* eslint-disable no-undef */
import ProductDetailPage from "../pages/product-detail-page";

describe(`Add to Wishlist [${os}]`, () => {
    const productDetailPage = new ProductDetailPage(global.baseUrl);

    context("when the shopper is authenticated", () => {
        it("should successfully add the item to the wishlist", async () => {
            await productDetailPage.open(process.env.CHECKOUT_PRODUCT_ID);
            await productDetailPage.signIn();
            await productDetailPage.addToWishlist({authenticated: true});
        });
    });
});
