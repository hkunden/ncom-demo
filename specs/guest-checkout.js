/* eslint-disable no-undef */
import BrowserActions from "../browser-actions";
import GuestCheckoutPage from "../pages/guest-checkout";
import ProductDetailPage from "../pages/product-detail-page";

describe(`Navigating to Guest Checkout from Jewelry PDP [${os}]`, () => {
    it("should navigating to guest checkout from Jewelry PDP and fill out the address fields", async () => {
        const productDetailPage = new ProductDetailPage(global.baseUrl);
        const guestCheckoutPage = new GuestCheckoutPage(global.baseUrl);

        await productDetailPage.open(process.env.CHECKOUT_PRODUCT_ID);
        await BrowserActions.pauseExecution(200);

        await productDetailPage.addProductToBag();
        await productDetailPage.checkoutFromAddToBagModal();

        await guestCheckoutPage.checkoutAsGuest();
        await guestCheckoutPage.fillOutNameAndAddress(
            process.env.FIRST_NAME,
            process.env.LAST_NAME,
            process.env.ADDRESS_1,
            process.env.ADDRESS_2,
            process.env.CITY,
            process.env.STATE,
            process.env.POSTAL_CODE,
        );
    });
});
