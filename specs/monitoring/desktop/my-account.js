/* eslint-disable no-undef */
import Homepage from "../../../pages/homepage";
import MyAccountPage from "../../../pages/my-account-page";
import OrderDetailsPage from "../../../pages/order-details-page";

const homepage = new Homepage(global.baseUrl);
const myAccountPage = new MyAccountPage(global.baseUrl);
const orderDetailsPage = new OrderDetailsPage(global.baseUrl);

describe(`Navigating to My Account [${os}]`, () => {
    before(async () => {
        await homepage.open();
    });

    it("should successfully navigate to the My Account Page", async () => {
        await homepage.navigateToMyAccountPage();
        await myAccountPage.checkForCoreComponents();
    });
});

describe(`Navigating To Order Details [${os}]`, () => {
    it("should successfully navigate to Order Details and Back to My Account", async () => {
        await myAccountPage.clickOnRandomOrder();
        await orderDetailsPage.returnToPurchasesPage();
        await myAccountPage.checkForCoreComponents();
    });
});
