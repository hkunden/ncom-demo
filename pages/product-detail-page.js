import Page from "./page";
import BrowserActions from "../browser-actions";

export default class ProductDetailPage extends Page {
    constructor(...args) {
        super(...args);
        this.addToBagButtonSelector = "#product-page-add-to-bag-button,#sticky-product-page-add-to-bag-button";
        this.addToBagModalSelector = "#add-to-bag-modal";
        this.addToWishlistLinkSelector = "#product-page-wish-list-link";
        this.channelBanner = "#chanel-banner";
        this.checkoutLinkSelector = "#product-page-add-to-bag-modal-checkout-link";
        this.colorFilterSelector = "#color-filter-product-page-anchor";
        this.pageContainerSelector = "#pdp";
        this.detailsAndSizeContainerSelector = "#details-and-size";
        this.moveToAnotherListButtonSelector = "span=Move to a different list";
        this.pageTitleSelector = "h1[itemprop=\"name\"]";
        this.sizeFilterSelector = "#size-filter-product-page-anchor";
        this.widthFilterSelector = "#width-filter-product-page-anchor";
        this.getSignInModalFormSelector = "form#sign-in";
        this.fitlerOptionSelector = "span=${text}`";
        this.soldOutStatus = "//*[@id='selling-essentials']//h3";
        this.soldOutStatusMobile = "#pdp > div  h3";
    }

    async open(productId) {
        await super.open(`s/${productId}`);
    }

    async checkForCoreComponents () {
        await BrowserActions.waitForElementToAppear(this.pageContainerSelector);
        await BrowserActions.waitForElementToAppear(this.sizeFilterSelector);
        await BrowserActions.waitForElementToAppear(this.detailsAndSizeContainerSelector);
        await BrowserActions.waitForElementToAppear(this.addToBagButtonSelector);
    }

    async addToWishlist({authenticated = false} = {}) {
        await BrowserActions.clickOnElement(this.addToWishlistLinkSelector);

        if (!authenticated) {
            await BrowserActions.waitForElementToAppear(this.getSignInModalFormSelector);
        } else {
            await BrowserActions.waitForElementToAppear(this.moveToAnotherListButtonSelector);
        }
    }

    async addProductToBag() {

        await BrowserActions.clickOnElement(this.addToBagButtonSelector);
        await BrowserActions.waitForElementToAppear(this.addToBagModalSelector);
    }

    async checkoutFromAddToBagModal() {
        await BrowserActions.clickOnElement(this.checkoutLinkSelector);
    }

    async getSoldOutStatus() {
        return await BrowserActions.getTextFromSelector(this.soldOutStatus);
    }

    async getSoldOutStatusMobile() {
        return await BrowserActions.getTextFromSelector(this.soldOutStatusMobile);
    }
}
