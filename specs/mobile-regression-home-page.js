/* eslint-disable no-undef */
import Homepage from "../pages/homepage.js";
import {expect} from "chai";
import Helpers from "../helpers";
const chaiSorted = require("chai-sorted");
const chai = require("chai");
chai.use(chaiSorted);

const homepage = new Homepage(global.baseUrl);

describe(`QAREGR-T6 - PHP: Page Rendering [${os}]`, () => {
    before(async () => {
        await homepage.open();
    });
    context("PHP: Page Rendering", () => {
        const expectedCategories = ["Activewear", "Women", "Men", "Kids", "Home", "Beauty", "Gifts"];
        it(`Hamburger menu contains the next categories: ${expectedCategories}`, async () => {
            await homepage.clickOnHamburgerMenu();
            const topMenuCategories = await homepage.getHamburgerMenuCategories();
            for (const str of expectedCategories) {
                expect(topMenuCategories).to.include(str);
            }
        });
    });
});

describe(`QAREGR-T10 - Recent search [${os}]`, () => {
    let searchTerm;
    const searchTerms = ["nike", "adidas", "luggage", "sweaters", "tory burch", "gucci",
        "shorts", "makeup", "pants", "shoes"];
    before(async () => {
        await homepage.open();
        searchTerm = await Helpers.getRandomElement(searchTerms);
        await homepage.performSearchMobile(searchTerm);
    });
    it("I should see more than 5 results", async () => {
        const searchResultCount = await searchResultsPage.getSearchResultCountMobile();
        expect(searchResultCount).to.be.greaterThan(5);
    });
    it("I click on Nordstrom logo", async () => {
        await homepage.clickOnNordstromLogoMobile();
    });
    it("I click on top recent search item", async () => {
        await homepage.clickRecentSearchesHeadMobile();
    });
    it("Search is executed against that value", async () => {
        expect(await searchResultsPage.getProductResultsAnchorMobile()).contain(searchTerm);
    });
});
