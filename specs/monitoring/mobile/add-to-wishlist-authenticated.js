/* eslint-disable no-undef */
import ProductDetailPage from "../../../pages/product-detail-page";
import SpecHelper from "../../helper";

describe(`Add to Wishlist [${os}]`, () => {
    context("Add to Wishlist when user is authenticated", () => {
        it("should successfully add the item to the wishlist", async () => {
            const helper = new SpecHelper();
            await helper.openProductPageByBrowsingMobile();

            const productDetailPage = new ProductDetailPage(global.baseUrl);
            await productDetailPage.signInMobile(process.env.EMAIL, process.env.PASSWORD);
            await productDetailPage.addToWishlistMobile({authenticated: true});
        });
    });
});
