/* eslint-disable no-undef */
import ProductDetailPage from "../../../pages/product-detail-page";
import SpecHelper from "../../helper";

describe(`Add to Wishlist [${os}]`, () => {
    context("Add to Wishlist when user is authenticated", () => {
        it("should successfully add the item to the wishlist", async () => {
            const helper = new SpecHelper();
            await helper.openProductPageByBrowsing();

            const productDetailPage = new ProductDetailPage(global.baseUrl);
            await productDetailPage.signIn();
            await productDetailPage.addToWishlist({authenticated: true});
        });
    });
});
