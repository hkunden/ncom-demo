/* eslint-disable no-undef */
/* eslint-disable object-curly-spacing */
import BrowserActions from "../../../browser-actions";
import Homepage from "../../../pages/homepage";
import { expect } from "chai";

describe(`Home Page [${os}]`, () => {
    context("Home Page", () => {
        it("should load home page", async () => {
            const homepage = new Homepage(global.baseUrl);

            await homepage.open();

            const url = await BrowserActions.getPageUrl();
            if (url.includes("/configure")) {
                expect(url).to.contain("nordstrom");
            }
            else {
                expect(url).to.equal(`${global.baseUrl}/`);
            }

            await homepage.checkForCoreComponents();
        });
    });
});
