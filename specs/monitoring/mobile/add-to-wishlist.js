/* eslint-disable no-undef */
import ProductDetailPage from "../../../pages/product-detail-page";
import SpecHelper from "../../helper";

describe(`Add to Wishlist [${os}]`, () => {
    context("Add to Wishlist as guest", () => {
        it("should successfuly prompt them to sign in", async () => {
            const productDetailPage = new ProductDetailPage(global.baseUrl);
            const helper = new SpecHelper();
            await helper.openProductPageByBrowsingMobile();

            await productDetailPage.addToWishlistMobile();
        });
    });
});
