import BrowserActions from "../browser-actions";
import Page from "./page";

export default class RecommendationsPage extends Page {
    constructor(...args) {
        super(...args);

        this.recTray1 = "#product-recommendations-shelf-shelf1-sub-1,#product-recommendations-shelf-shelf1";
        this.recTray2 = "#product-recommendations-shelf-shelf2";
    }

    async isRecTray1Displayed() {
        await BrowserActions.waitForElementToAppear(this.recTray1);
        return await BrowserActions.isElementDisplayed(this.recTray1);
    }

    async isRecTray2Displayed() {
        await BrowserActions.waitForElementToAppear(this.recTray2);
        return await BrowserActions.isElementDisplayed(this.recTray2);
    }
}
