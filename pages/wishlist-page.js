import BrowserActions from "../browser-actions";
import Page from "./page";
import Helpers from "../helpers";
import {textToBePresentInElement} from "wdio-wait-for";

export default class WishlistPage extends Page {
    constructor(...args) {
        super(...args);

        this.anniversarySaleWLLabel = "//*[contains(@id,'item-popover-desktop-')]//*[contains(text(),'Anniversary Sale')]";
        this.selectAll = "//*[@id='controls-sale-popover-id']/parent::div//*[contains(text(),'Select All')]";
        this.selectAllMobile = "//*[contains(text(),'Select All')]";
        this.deleteButton = "//*[@id='layer-2']//*[contains(text(),'Delete')]";
        this.deleteLinkMobile = "//*[@id='action-bar']//*[contains(text(),'Delete')]";
        this.removeButtonMobile = "//*[@id='action-bar']//*[contains(text(),'Remove')]";
        this.removeItem = "//*[contains(@id,'wishlist-item-')]//*[contains(text(),'Remove')]";
        this.wishListItems = "//*[contains(@id,'wishlist-item-')]";
        this.wishListItemsMobile = "//*[contains(@id,'item-popover-mobile-')]";
        this.wishListItemSelection = "//*[contains(@class,'nui-icon nui-icon-large-selection-inactive')]";
        this.wishListAddToBag = "//*[contains(text(),'Add to Bag')]";
        this.wishListMove = "//*[(@id='bottom-bar-move')]";
        this.wishListDelete = "//*[text()='Delete']";
        this.createNewList = "#create-list-link";
        this.wishlistName = "//*[@id='dialog-description']//input";
        this.createListButton = "//*[@id='dialog-description']//button[1]";
        this.createListErrorMessage = "//*[@id='dialog-description']//p";
        this.wishListItemsSelection = "//*[contains(@id,'selection-check-')]/*";
        this.itemsSelected = "//strong[contains(text(),' selected')]";
        this.wishListRemove = "//*[@id='action-bar']//*[text()='Remove']";
        this.addedToBagMessage = "//*[contains(text(),'added to your bag')]";
        this.addedToBagMessageMobile = "//*[contains(text(),'Added to your bag.')]";
        this.keepShoppingButton = "//*[contains(text(),'Keep Shopping')]";
        this.wishlistCheckoutButton = "//span[contains(text(),'Checkout')]";
        this.quickAddToBag = "//*[contains(@id,'item-popover-desktop-')]//*[contains(text(),'Add to Bag')]";
        this.quickAddToBagMobile = "//*[contains(@id,'wishlist-item-')]//*[contains(text(),'Add to Bag')]";
        this.inYourBagText = "//*[contains(@id,'item-popover-desktop-')]//*[contains(text(),'In Your Bag')]";
        this.inYourBagTextMobile = "//*[contains(@id,'wishlist-item-')]//*[contains(text(),'In Your Bag')]";
        this.undoRemove = "//*[contains(@id,'layer-3')]//*[contains(text(),'Undo')]";
        this.wishlistSelectionDropdown = "//*[@id='wishlists-dropdown-menu']//*[@aria-label='dropdown']";
        this.defaultWishlist = "//*[contains(@id,'option-list')]//*[text()='Wish List']";
        this.miniPdpIncrementQuantity = "//*[@id='mini-pdp-increment-quantity']";
        this.miniPdpDecrementQuantity = "//*[@id='mini-pdp-decrement-quantity']";
        this.miniPdpCurrentQuantity = "//*[@id='mini-pdp-decrement-quantity']/following-sibling::span";
        this.miniPdpColor = "//*[contains(@id,'color-swatch-item-')]";
        this.miniPdpSizeDropDown = "//*[@id='size-filter-wishlist-page-anchor']";
        this.miniPdpSizeDropOptions = "//*[@id='size-filter-wishlist-page-option-list']/li";
        this.miniPdpSeeDetails = "//*[contains(text(),'See details')]";
        this.miniPdpRightSlider = "//*[contains(@class,'slider-control-centerright')]/span";
        this.confirmRemove = "//*[@id='dialog-description']//*[text()='Remove']";
        this.confirmRemoveMobile = "//*[@id='layer-9']//*[text()='Remove']";
        this.wLUpdatesBanner = "//*[@id='branch-banner-iframe']";
        this.closeWLUpdatesBanner = "//*[contains(@id,'branch-banner-close1')]";
    }

    async open() {
        await super.open("my-account/wishlist");
        await this.clickCloseWLUpdatedBanner();
    }

    async clickCloseWLUpdatedBanner() {
        try {
            if (await BrowserActions.isDeviceAndroid() || await BrowserActions.isDeviceIPhone()) {
                await BrowserActions.pauseExecution(1500);
                if (await BrowserActions.isElementDisplayed(this.wLUpdatesBanner)) {
                    await BrowserActions.switchToIFrame(this.wLUpdatesBanner);
                    if (await BrowserActions.isElementDisplayed(this.closeWLUpdatesBanner)) {
                        await BrowserActions.clickOnElementMobile(this.closeWLUpdatesBanner);
                    }
                }
            }
        } catch (ex) {
            console.log(ex);
        }
    }

    async isAnniversarySaleWLLabelDisplayed() {
        return await BrowserActions.waitForElementToAppear(this.anniversarySaleWLLabel);
    }

    async clickSelectAll() {
        await BrowserActions.clickOnElementMobile(this.selectAll);
    }

    async clickSelectAllMobile() {
        await BrowserActions.clickOnElementMobile(this.selectAllMobile);
    }

    async clickDeleteButton() {
        await BrowserActions.clickOnElementMobile(this.deleteButton);
    }

    async clickRemoveButtonMobile() {
        await BrowserActions.clickOnElementMobile(this.removeButtonMobile);
    }

    async clickDeleteDisplayed() {
        await BrowserActions.clickOnElementMobile(this.wishListDelete);
    }

    async clickRemoveItem() {
        await BrowserActions.clickOnElementMobile(this.removeItem);
    }

    async isRemoveItemDisplayed() {
        return await BrowserActions.isElementDisplayed(this.removeItem);
    }

    async getRemoveItemCount() {
        return await BrowserActions.getElementCount(this.removeItem);
    }

    async getWishListItemsCount() {
        await BrowserActions.pauseExecution(1000);
        return await BrowserActions.getElementCount(this.wishListItems);
    }

    async selectFirstInactiveWishListItem() {
        await BrowserActions.scrollToElement(this.wishListItemSelection);
        await BrowserActions.clickOnElementMobile(this.wishListItemSelection);
    }

    async waitForInactiveWishListItem() {
        await BrowserActions.waitForElementToAppear(this.wishListItemSelection);
    }

    async getWishListAddToBagText() {
        return await BrowserActions.getTextFromSelector(this.wishListAddToBag);
    }

    async isWishListMoveDisplayed() {
        return await BrowserActions.isElementDisplayed(this.wishListMove);
    }

    async isWishListDeleteDisplayed() {
        return await BrowserActions.isElementDisplayed(this.wishListDelete);
    }

    async createNewWishlist() {
        if (!await BrowserActions.isBrowserSafari()) {
            await BrowserActions.clickOnElement(this.createNewList);
        } else {
            await BrowserActions.clickOnElementMobile(this.createNewList);
        }
    }

    async createNewWishlistMobile() {
        await BrowserActions.clickOnElementMobile(this.createNewList);
    }

    async enterWishlistName(name) {
        await BrowserActions.setTextOnElement(this.wishlistName, name);
    }

    async clickCreateListButton() {
        if (!await BrowserActions.isBrowserSafari()) {
            await BrowserActions.clickOnElement(this.createListButton);
        } else {
            await BrowserActions.clickOnElementMobile(this.createListButton);
        }
    }

    async clickCreateListButtonMobile() {
        await BrowserActions.clickOnElementMobile(this.createListButton);
    }

    async getCreateListErrorMessage() {
        return await BrowserActions.getTextFromSelector(this.createListErrorMessage);
    }

    async selectWishListItems() {
        await BrowserActions.clickOnElementMobile(this.wishListItemsSelection);
    }

    async selectWishListItemsByIndex(index) {
        await BrowserActions.scrollToElementByIndex(this.wishListItemsSelection, index);
        await BrowserActions.scrollByPx(3, -100);
        await BrowserActions.clickOnElementByIndexMobile(this.wishListItemsSelection, index);
    }

    async isItemsSelectedDisplayed() {
        return await BrowserActions.isElementDisplayed(this.itemsSelected);
    }

    async isWishListAddToBagDisplayed() {
        return await BrowserActions.isElementDisplayed(this.wishListAddToBag);
    }

    async isWishListDeleteButtonDisplayed() {
        return await BrowserActions.isElementDisplayed(this.wishListDelete);
    }

    async clickWishListAddToBag() {
        await BrowserActions.clickOnElementMobile(this.wishListAddToBag);
    }

    async isItemsAddedToBagDisplayed() {
        return await BrowserActions.isAnyElementDisplayed(this.addedToBagMessage);
    }

    async isItemsAddedToBagDisplayedMobile() {
        await BrowserActions.waitForElementToAppear(this.addedToBagMessageMobile);
        return await BrowserActions.isAnyElementDisplayed(this.addedToBagMessageMobile);
    }

    async isKeepShoppingDisplayed() {
        return await BrowserActions.isElementDisplayed(this.keepShoppingButton);
    }

    async isGoToCheckoutDisplayed() {
        return await BrowserActions.isElementDisplayed(this.wishlistCheckoutButton);
    }

    async cleanWishlist() {
        const itemsCount = await this.getWishListItemsCount();
        await BrowserActions.scrollByPx(3, 100);
        for (let i = 0; i <= itemsCount - 2; i++) {
            await this.selectWishListItemsByIndex(0);
            await this.clickDeleteDisplayed();
            await BrowserActions.pauseExecution(500);
        }
    }

    async cleanDefaultWishlist() {
        let currentWishListName;
        try {
            await BrowserActions.pauseExecutionUntilConditionMet(
                textToBePresentInElement(this.wishlistSelectionDropdown + "//span", "Wish List"));
            currentWishListName = await BrowserActions.getTextFromSelector(this.wishlistSelectionDropdown + "//span");
        } catch (e) {
            currentWishListName = "";
            console.log(e);
        }
        if (currentWishListName.length > 0 && !currentWishListName.includes("Wish List")) {
            await BrowserActions.clickOnElementMobile(this.wishlistSelectionDropdown);
            await BrowserActions.clickOnElementMobile(this.defaultWishlist);
        }
        const itemsCount = await this.getWishListItemsCount();
        await BrowserActions.scrollByPx(3, 100);
        for (let i = 0; i <= itemsCount - 2; i++) {
            await this.selectWishListItemsByIndex(0);
            await this.clickDeleteDisplayed();
            await BrowserActions.pauseExecution(500);
        }
    }

    async clickQuickAddToBag() {
        await BrowserActions.clickOnElement(this.quickAddToBag);
    }

    async getInYourBagText() {
        return await BrowserActions.getTextFromSelector(this.inYourBagText);
    }

    async getInYourBagTextMobile() {
        return await BrowserActions.getTextFromSelector(this.inYourBagTextMobile);
    }

    async clickInYourBagButton() {
        await BrowserActions.clickOnElement(this.inYourBagText);
    }

    async clickQuickAddToBagMobile() {
        await BrowserActions.scrollByPx(4, 100);
        await BrowserActions.clickOnElementMobile(this.quickAddToBagMobile);
    }

    async clickUndoRemove() {
        await BrowserActions.clickOnElementMobile(this.undoRemove);
    }

    async clickOnFirstWishListItem() {
        await BrowserActions.clickOnElementMobile(this.wishListItems);
    }

    async clickOnFirstWishListItemMobile() {
        await BrowserActions.clickOnElementInLoopWithSelector(this.wishListItemsMobile, 7, this.miniPdpSeeDetails);
    }

    async getMiniPdpCurrentQuantity() {
        await BrowserActions.pauseExecution(1000);
        return parseInt(await BrowserActions.getTextFromSelector(this.miniPdpCurrentQuantity));
    }

    async clickMiniPdpIncrementQuantity() {
        await BrowserActions.clickOnElementMobile(this.miniPdpIncrementQuantity);
    }

    async clickMiniPdpDecrementQuantity() {
        await BrowserActions.clickOnElementMobile(this.miniPdpDecrementQuantity);
    }

    async getMiniPdpColorsOptionsCount() {
        return await BrowserActions.getElementCount(this.miniPdpColor);
    }

    async getMiniPdpSelectedColor() {
        return await BrowserActions.getAttributeFromSelector(this.miniPdpColor +
            "//*[contains(@alt,'selected')]", "title");
    }

    async clickMiniPdpColorsByIndex(index) {
        await BrowserActions.clickOnElementByIndexMobile(this.miniPdpColor, index);
    }

    async clickMiniPdpColorsByIndexMobile(index) {
        await BrowserActions.clickOnElementByIndexMobile(this.miniPdpColor + "//img", index);
    }

    async isMiniPdpSizeDropdownDisplayed() {
        return await BrowserActions.isElementDisplayed(this.miniPdpSizeDropDown);
    }

    async clickMiniPdpSizeDropdown() {
        await BrowserActions.clickOnElementMobile(this.miniPdpSizeDropDown);
    }

    async getMiniPdpCurrentSize() {
        await BrowserActions.pauseExecution(1000);
        return await BrowserActions.getTextFromSelector(this.miniPdpSizeDropDown);
    }

    async clickMiniPdpRandomSize() {
        const sizeOptions = await BrowserActions.getElementCount(this.miniPdpSizeDropOptions);
        const randomIndex = await Helpers.getRandomNumber(0, sizeOptions - 1);
        await BrowserActions.clickOnElementByIndexMobile(this.miniPdpSizeDropOptions, randomIndex);
    }

    async clickConfirmRemove() {
        await BrowserActions.clickOnElementMobile(this.confirmRemove);
    }

    async clickConfirmRemoveMobile() {
        await BrowserActions.clickOnElementMobile(this.confirmRemoveMobile);
    }
}
