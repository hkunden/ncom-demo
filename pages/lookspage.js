import Page from "./page";
import BrowserActions from "../browser-actions";
import Helpers from "../helpers";

export default class LooksPage extends Page {
    constructor(...args) {
        super(...args);
        this.looksBanner = "#looks-header-headline-text";
        this.looksShelf = "#carousel-container-media-carousel-wrapper";
        this.looksFirstProduct = "//*[contains(@data-testid,'look-grid-item-')]";
        this.looksFirstProductMobile = "//*[@aria-label='carousel-slider']//a[1]";
        this.looksSizeOptionList = "//*[contains(@aria-label,'menu')]//li";
        this.looksSizeOptionListMobile = "//*[contains(@id,'size-swatch-item')]//button/*";
        this.looksSizeDropdown = "//*[contains(@aria-label,'dropdown')]";
        this.looksAddToBag = "//*[contains(@id,'controls-ADD_TO_BAG')]";
        this.inYourBag = "//*[contains(text(),'In Your Bag')]";
    }

    async isLooksBannerDisplayed() {
        return await BrowserActions.isElementDisplayed(this.looksBanner);
    }

    async clickOnFirstLooksProduct() {
        await BrowserActions.scrollToElement(this.looksShelf);
        const randomIndex = await Helpers.getRandomNumber(0, 10);
        await BrowserActions.clickOnElementByIndex(this.looksFirstProduct, randomIndex);
    }

    async clickOnFirstLooksProductMobile() {
        await BrowserActions.slowScrollByPx(14, 50);
        await BrowserActions.clickOnElementMobile(this.looksFirstProductMobile);
    }

    async clickLooksSizeDropDown() {
        if (await BrowserActions.getElementCount(this.looksSizeOptionList) === 0) {
            await BrowserActions.clickOnElement(this.looksSizeDropdown);
        }
    }

    async clickLooksSizeDropDownMobile() {
        await BrowserActions.scrollToElement(this.looksAddToBagMobile);
        if (await BrowserActions.getElementCount(this.looksSizeOptionList) === 0) {
            await BrowserActions.clickOnElementMobile(this.looksSizeDropdown);
        }
    }

    async clickLooksRandomSize() {
        await BrowserActions.waitForElementToAppear(this.looksSizeOptionList);
        await BrowserActions.clickOnElementInLoop(this.looksSizeOptionList, 20);
    }

    async clickLooksRandomSizeMobile() {
        await BrowserActions.waitForElementToAppear(this.looksSizeOptionListMobile);
        await BrowserActions.clickOnElementInLoop(this.looksSizeOptionListMobile, 20);
    }

    async clickLooksAddToBag() {
        await BrowserActions.clickOnElement(this.looksAddToBag);
    }

    async clickLooksAddToBagMobile() {
        await BrowserActions.clickOnElementMobile(this.looksAddToBag);
    }

    async isLooksInYourBagDisplayed() {
        await BrowserActions.waitForElementToAppear(this.inYourBag);
        return await BrowserActions.isElementDisplayed(this.inYourBag);
    }
}
