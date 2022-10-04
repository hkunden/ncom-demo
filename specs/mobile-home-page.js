/* eslint-disable no-undef */
import BrowserActions from "../browser-actions";
import Homepage from "../pages/homepage";
import {expect} from "chai";

describe(`Verify Home Page on mobile. [${os}]`, () => {
    it("should load home page", async () => {
        const homepage = new Homepage(global.baseUrl);

        await homepage.open();
        // await homepage.checkForCoreComponents();

        const url = await BrowserActions.getPageUrl();
        if (url.includes("/#fscommand")) {
            expect(url).to.contain("nordstrom");
        }
        else {
            expect(url).to.equal(`${global.baseUrl}/`);
        }
    });
});
