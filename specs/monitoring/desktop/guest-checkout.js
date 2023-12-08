/* eslint-disable no-undef */
import BrowserActions from "../../../browser-actions";
import GuestCheckoutPage from "../../../pages/guest-checkout";
import ProductDetailPage from "../../../pages/product-detail-page";
import SpecHelper from "../../helper";

describe(`Navigating to Guest Checkout from PDP [${os}]`, () => {
    it("should navigating to guest checkout from PDP and fill out the address fields", async () => {
        const helper = new SpecHelper();
        await helper.openProductPageByBrowsing();

        const productDetailPage = new ProductDetailPage(global.baseUrl);
        const guestCheckoutPage = new GuestCheckoutPage(global.baseUrl);

        await BrowserActions.pauseExecution(200);

        await productDetailPage.addProductToBag();
        await productDetailPage.checkoutFromAddToBagModal();

        await guestCheckoutPage.checkoutAsGuest();
        await guestCheckoutPage.fillOutNameAndAddress(
            process.env.FIRST_NAME,
            process.env.LAST_NAME,
            process.env.ADDRESS1,
            process.env.ADDRESS2,
            process.env.CITY,
            process.env.STATE,
            process.env.POSTAL_CODE,
        );
    });
});
