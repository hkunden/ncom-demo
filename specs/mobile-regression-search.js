/* eslint-disable no-undef */
import Homepage from "../pages/homepage.js";
import SearchResultsPage from "../pages/search-results-page.js";
import {expect} from "chai";
const chaiSorted = require("chai-sorted");
const chai = require("chai");
chai.use(chaiSorted);
import BrowserActions from "../browser-actions.js";
import ProductResultsPage from "../pages/product-results-page";
import Helpers from "../helpers";
import ProductDetailPage from "../pages/product-detail-page";

const homepage = new Homepage(global.baseUrl);
const searchResultsPage = new SearchResultsPage(global.baseUrl);
const productDetailPage = new ProductDetailPage(global.baseUrl);

describe(`When searching for 'boots' [${os}]`, () => {
    const searchTerm = "boots";
    before(async () => {
        await homepage.open();
        await homepage.performSearchMobile(searchTerm);
    });

    it("should return more than 40 results", async () => {
        await BrowserActions.scrollToPageBottom();
        const searchResultCount = await searchResultsPage.getSearchResultCountMobile();

        expect(searchResultCount).to.be.greaterThan(40);
    });
});

describe(`QAREGR-T116 - When searching for 'nullnull' [${os}]`, () => {
    const urlPath = global.baseUrl.includes("rack") ?
        "search?origin=keywordsearch&keyword=nullnull" : "sr?origin=keywordsearch&keyword=nullnull";
    before(async () => {
        const productResultsPage = new ProductResultsPage(global.baseUrl);
        await productResultsPage.open(urlPath);
    });

    context("When redirected to Null results page", () => {
        it("should display phone number and 'No results for nullnull' message", async () => {
            await searchResultsPage.checkForNullResultsMessage();
            const phoneNumberText = await searchResultsPage.getPhoneNumberText();
            if (global.baseUrl.includes("rack")) {
                expect(phoneNumberText).to.contain("1.888.966.6283");
            } else {
                expect(phoneNumberText).to.contain("1.888.282.6060");
            }
            const noResultsMessageText = await searchResultsPage.getNoResultsMessageText();
            expect(noResultsMessageText).to.contain("No results for “nullnull");
        });
    });

    context("When clicking on Brand or Designer link", () => {
        it("should redirect to Brands page", async () => {
            await searchResultsPage.clickOnBrandOrDesignerLinkMobile();
            const getPageURL = BrowserActions.getPageUrl;
            const browserUrl = await getPageURL();
            expect(browserUrl).to.contain("/brands");
            browser.back();
            await searchResultsPage.checkForNullResultsMessage();
        });
    });

    context("When clicking on Chat With Us link", () => {
        it("should redirect to Customer Service page", async () => {
            await searchResultsPage.clickOnChatWithUsLinkMobile();
        });
    });
});

describe(`QAREGR-T103 - Search: Product count should persist [${os}]`, () => {
    const searchTerm = "nike";
    before(async () => {
        await homepage.open();
        await homepage.performSearchMobile(searchTerm);
    });

    context("When changing filter on search results page", () => {
        it("should display the same total counter", async () => {
            const searchResultCount = await searchResultsPage.getTotalItemsCounterMobile();
            await searchResultsPage.sortSearchResultsByMobile("Newest");
            const newSearchResultCount = await searchResultsPage.getTotalItemsCounterMobile();
            expect(searchResultCount).contain(newSearchResultCount);
        });
    });
});

describe(`QAREGR-T2 - Search: Content header [${os}]`, () => {
    const searchTerm = "backpacks";
    before(async () => {
        await homepage.open();
        await homepage.performSearchMobile(searchTerm);
    });
    const message = "You searched for";
    it(`The content header displays [${message} ${searchTerm}]`, async () => {
        const productResultsAnchorText = await searchResultsPage.getProductResultsAnchorMobile();
        expect(productResultsAnchorText).contain(searchTerm);
    });
    it(`[${message} ${searchTerm}] should be displayed under 'Recent Searches'`, async () => {
        await homepage.clearSearchInputMobile();
        expect(await homepage.getRecentSearchesMobile()).contain(searchTerm);
    });
});

describe(`QAREGR-T12 - Search: Searching 11th item [${os}]`, () => {
    const firstSearchTerm = "backpacks";
    const searchTerms = ["nike", "adidas", "luggage", "sweaters", "tory burch", "gucci",
        "shorts", "makeup", "pants", "shoes"];
    before(async () => {
        await homepage.open();
        await homepage.performSearchMobile(firstSearchTerm);
        for (let i = 0; i < searchTerms.length; i++) {
            await homepage.openSearchInputMobile();
            await homepage.performSearchMobile(searchTerms[i]);
        }
    });

    it(` ${searchTerms}] should be displayed under 'Recent Searches'`, async () => {
        await homepage.clearSearchInputMobile();
        const recentSearches = await homepage.getRecentSearchesMobile();
        for (let i = 0; i < searchTerms.length; i++) {
            expect(searchTerms).contain(recentSearches[i]);
        }
        expect(searchTerms).not.contain(firstSearchTerm);
    });
});

describe(`QAREGR-T14 - Search: UI validation [${os}]`, () => {
    before(async () => {
        await homepage.open();
    });
    const expectedText = "What can we help you find?";
    it(`Text in the search bar is "${expectedText}"`, async () => {
        await homepage.openSearchInputMobile();
        const searchInputBarText = await homepage.getSearchInputText();
        expect(searchInputBarText).contain(expectedText);
    });
});

describe(`QAREGR-T38 - Search: Recent searches list [${os}]`, () => {
    const searchTerms = ["backpacks", "luggage", "sweaters", "tory burch", "gucci", "shorts"];
    before(async () => {
        await homepage.open();
        for (let i = 0; i < searchTerms.length; i++) {
            await homepage.openSearchInputMobile();
            await homepage.performSearchMobile(searchTerms[i]);
        }
    });

    it(` ${searchTerms}] should be displayed under 'Recent Searches'`, async () => {
        await homepage.clearSearchInputMobile();
        const recentSearches = await homepage.getRecentSearchesMobile();
        for (let i = 0; i < searchTerms.length; i++) {
            expect(searchTerms).contain(recentSearches[i]);
        }
    });
});

describe(`QAREGR-T104 - Sorting query in URL [${os}]`, () => {
    const searchTerm = "nike";
    before(async () => {
        await homepage.open();
        await homepage.performSearchMobile(searchTerm);
    });

    context("When changing filter on search results page to Newest", () => {
        it("URL should contain appropriate value", async () => {
            await searchResultsPage.sortSearchResultsByMobile("Newest");
            const getPageURL = BrowserActions.getPageUrl;
            const browserUrl = await getPageURL();
            expect(browserUrl).to.contain("Newest");
        });
    });

    context("When changing filter on search results page to PriceHighToLow", () => {
        it("URL should contain appropriate value", async () => {
            await searchResultsPage.sortSearchResultsByMobile("PriceHighToLow");
            const getPageURL = BrowserActions.getPageUrl;
            const browserUrl = await getPageURL();
            expect(browserUrl).to.contain("PriceHighToLow");
        });
    });

    context("When changing filter on search results page to PriceLowToHigh", () => {
        it("URL should contain appropriate value", async () => {
            await searchResultsPage.sortSearchResultsByMobile("PriceLowToHigh");
            const getPageURL = BrowserActions.getPageUrl;
            const browserUrl = await getPageURL();
            expect(browserUrl).to.contain("PriceLowToHigh");
        });
    });

    context("When changing filter on search results page to PercentOff", () => {
        it("URL should contain appropriate value", async () => {
            await searchResultsPage.sortSearchResultsByMobile("PercentOff");
            const getPageURL = BrowserActions.getPageUrl;
            const browserUrl = await getPageURL();
            expect(browserUrl).to.contain("PercentOff");
        });
    });
});

describe(`QAREGR-T43 - Search: BOPUS Non-LME Toggle ON/OFF [${os}]`, async () => {
    const isNCOM = await BrowserActions.isSiteNCOM(global.baseUrl);
    const isNCA = await BrowserActions.isSiteNCA(global.baseUrl);
    if (isNCOM || isNCA) { // We only run these tests on NCOM and NCA
        before(async () => {
            await searchResultsPage.searchForItemUsingRequest("tom-ford");
        });
        let availableItemsNumber;
        it("I store the number of available items", async () => {
            availableItemsNumber = await Helpers.trimAllNonNumericCharacters(
                await searchResultsPage.getAvailableItemsNumberMobile());
        });
        it("I click BOPUS toggle button \"ON\"", async () => {
            await searchResultsPage.clickStoreMode();
            await searchResultsPage.clickSetLocationMobile();
        });
        let nonLMEZipCodesFile;
        it("Enter zip code from file " + nonLMEZipCodesFile, async () => {
            if (await isNCOM) {
                nonLMEZipCodesFile = "test_zip_codes_us.txt";
            }
            if (await isNCA) {
                nonLMEZipCodesFile = "test_zip_codes_ca.txt";
            }
            const nonLMEZipCodes = await Helpers.getRandomElement(
                await Helpers.asyncReadFile("test_data/" + nonLMEZipCodesFile));
            await searchResultsPage.setZipcode(nonLMEZipCodes);
        });
        it("Click search", async () => {
            await searchResultsPage.clickSearchZipcodeMobile();
        });
        let store;
        it("I see list of stores", async () => {
            const storesList = await searchResultsPage.getBopusListOfStores();
            store = await storesList[0].split(/\d/)[0];
            expect(storesList.length).to.greaterThan(1);
        });
        it("I click 'Set Your Store'", async () => {
            await searchResultsPage.clickSetYourStoreMobile();
        });
        it("I select 'Available Today' option", async () => {
            await searchResultsPage.clickPickUpTodayOptionMobile();
        });
        it("I see this store applied in filter section", async () => {
            const pickUpTomorrowTextList = await searchResultsPage.getPickUpText();
            let pickUpTomorrowText;
            for (let i = 0; i < pickUpTomorrowTextList.length; i++) {
                if (pickUpTomorrowTextList[i].length > 0) {
                    pickUpTomorrowText = pickUpTomorrowTextList[i];
                }
            }
            expect(pickUpTomorrowText).to.contain(store);
        });
        it("The number of available items changed", async () => {
            await searchResultsPage.clickDoneButton();
            const value = await Helpers.trimAllNonNumericCharacters(
                await searchResultsPage.getAvailableItemsNumberMobile());
            expect(availableItemsNumber).to.not.equals(value);
        });
        it("I turn off 'Available Today' option", async () => {
            await searchResultsPage.clickStoreMode();
            await searchResultsPage.clickPickUpTodayOptionMobile();
        });
        it("The number of available items changed", async () => {
            await searchResultsPage.clickDoneButton();
            const currentAvailableItemsNumber = await Helpers.trimAllNonNumericCharacters(
                await searchResultsPage.getAvailableItemsNumberMobile());
            expect(availableItemsNumber).to.equals(currentAvailableItemsNumber);
        });
    }
});

describe(`QAREGR-T99 - SEO content block [${os}]`, async () => {

    const isNCOM = await BrowserActions.isSiteNCOM(global.baseUrl);
    const isNCA = await BrowserActions.isSiteNCA(global.baseUrl);
    if (isNCOM || isNCA) { // We only run these tests on NCOM and NCA

        const urlPath = "browse/women/clothing?breadcrumb=Home%2FWomen%2FClothing&origin=topnav";
        before(async () => {
            const productResultsPage = new ProductResultsPage(global.baseUrl);
            await productResultsPage.open(urlPath);
        });

        context("When scrolling page to the bottom", () => {
            it("should contain SEO content block", async () => {
                browser.refresh();
                await BrowserActions.scrollToPageBottom();
                await searchResultsPage.waitForSEOContentBlock();
                await searchResultsPage.clickOnSEOContentBlockMobile();
                await searchResultsPage.checkForSEOContentBlock();
            });
        });
    }
});

describe(`QAREGR-T113 - Search: Pagination [${os}]`, async () => {
    const urlPath = global.baseUrl.includes("rack") ?
        "shop/Women/Clothing?breadcrumb=Home%2FWomen%2FClothing&origin=topnav"
        : "browse/women/clothing?breadcrumb=Home%2FWomen%2FClothing&origin=topnav";
    before(async () => {
        const productResultsPage = new ProductResultsPage(global.baseUrl);
        await productResultsPage.open(urlPath);
    });

    context("When I click on page 4", () => {
        it("should redirect to the page 4", async () => {
            browser.refresh();
            await BrowserActions.scrollToPageBottom();
            await searchResultsPage.getPageOfSearchResultsByIndexMobile(3);
            await BrowserActions.scrollToPageBottom();
            const getPageURL = BrowserActions.getPageUrl;
            const browserUrl = await getPageURL();
            expect(browserUrl).to.contain("page=4");
        });
    });

    context("When I click on Previous button", () => {
        it("should redirect to the page 3", async () => {
            await searchResultsPage.clickOnPreviousOrNextButtonMobile(0);
            const getPageURL = BrowserActions.getPageUrl;
            const browserUrl = await getPageURL();
            expect(browserUrl).to.contain("page=3");
        });
    });

    context("When changing filter on search results page", () => {
        it("should redirect to the page 1", async () => {
            await searchResultsPage.sortSearchResultsByMobile("Newest");
            await BrowserActions.scrollToPageBottom();
            const buttonName = await BrowserActions.getTextFromSelector(searchResultsPage.nextButtonSelectorMobile);
            expect(buttonName).to.contain("Next");
        });
    });
});

describe(`QAREGR-T43 - Search: BOPUS Non-LME Toggle ON/OFF [${os}]`, async () => {
    const isNCOM = await BrowserActions.isSiteNCOM(global.baseUrl);
    const isNCA = await BrowserActions.isSiteNCA(global.baseUrl);
    if (isNCOM || isNCA) { // We only run these tests on NCOM and NCA
        before(async () => {
            await searchResultsPage.searchForItemUsingRequest("tom-ford");
        });
        it("I click BOPUS toggle button \"ON\"", async () => {
            await searchResultsPage.clickStoreMode();
            await searchResultsPage.clickSetLocationMobile();
        });
        let nonLMEZipCodesFile;
        it("Enter zip code from file " + nonLMEZipCodesFile, async () => {
            if (await isNCOM) {
                nonLMEZipCodesFile = "test_zip_codes_us.txt";
            }
            if (await isNCA) {
                nonLMEZipCodesFile = "test_zip_codes_ca.txt";
            }
            const nonLMEZipCodes = await Helpers.getRandomElement(
                await Helpers.asyncReadFile("test_data/" + nonLMEZipCodesFile));
            await searchResultsPage.setZipcode(nonLMEZipCodes);
        });
        it("Click search", async () => {
            await searchResultsPage.clickSearchZipcodeMobile();
        });
        const storesDistance = [];
        it("I see list of stores by distance (nearest to furthest)", async () => {
            const storesList = await searchResultsPage.getBopusListOfStores();
            for (let i = 0; i < storesList.length; i++) {
                storesDistance.push(await Helpers.trimDistanceFromStoresList(storesList[i]));
            }
            expect(storesDistance).to.be.sorted();
        });
    }
});

describe(`QAREGR-T48 - Search: Sold out item [${os}]`, async () => {
    const isNCOM = await BrowserActions.isSiteNCOM(global.baseUrl);
    const isNCA = await BrowserActions.isSiteNCA(global.baseUrl);
    const isRack = await BrowserActions.isSiteRack(global.baseUrl);
    before(async () => {
        let soldOutItemsFilseName;
        if (await isNCOM) {
            soldOutItemsFilseName = "sold_out_ncom.txt";
        }
        if (await isNCA) {
            soldOutItemsFilseName = "sold_out_ca.txt";
        }
        if (await isRack) {
            soldOutItemsFilseName = "sold_out_rack.txt";
        }
        const soldOutItem = await Helpers.getRandomElement(
            await Helpers.asyncReadFile("test_data/" + soldOutItemsFilseName));
        await searchResultsPage.goToItemByIDUsingRequest(soldOutItem);
    });
    it("The item has status 'Sold Out'", async () => {
        expect(await productDetailPage.getSoldOutStatusMobile()).to.be.equal("SOLD OUT");
    });
});

describe(`QAREGR-T173 - Search: E-gift card - Nordstrom Gift Cards [${os}]`, async () => {
    before(async () => {
        await searchResultsPage.searchForItemUsingRequest("gift cards");
    });

    it("should contain appropriate URL in Check Balance button", async () => {
        await BrowserActions.scrollToElement(searchResultsPage.checkBalanceButton);
        if (await BrowserActions.isSiteNCOM(global.baseUrl)) {
            expect(await searchResultsPage.getURLFromCheckBalanceButton())
                .to.contain("nordstrom-gift-cards?keyword=gift+card+balance");
        }
        if (await BrowserActions.isSiteNCA(global.baseUrl)) {
            expect(await searchResultsPage.getURLFromCheckBalanceButton())
                .to.contain("https://www.nordstrom.ca/nordstrom-gift-cards");
        } else {
            expect(await searchResultsPage.getURLFromCheckBalanceButton())
                .to.contain("https://www.nordstrom.com/nordstrom-gift-cards");
        }
    });
});

describe(`QAREGR-T36 - Search: Sort by featured - default state [${os}]`, async () => {
    before(async () => {
        await searchResultsPage.searchForItemUsingRequest("Furniture");
    });
    const expectedDefaultSorting = "Sort by featured";
    it(`The default sorting is ${expectedDefaultSorting}`, async () => {
        const defaultSorting = await searchResultsPage.getDefaultSorting();
        expect(defaultSorting).to.contain(expectedDefaultSorting);
        const option = "Newest";
        await searchResultsPage.sortSearchResultsByMobile(option);
        expect(await BrowserActions.getPageUrl()).to.contain(`sort=${option}`);
        await searchResultsPage.sortSearchResultsByMobile("Featured");
        expect(await BrowserActions.getPageUrl()).to.not.contain("sort=");
    });
});

describe(`QAREGR-T18 when sorting results by Featured, Newest, PercentOff, 
PriceHighToLow, PriceLowToHigh [${os}]`, () => {
    const searchTerm = "jeans";
    before(async () => {
        await searchResultsPage.searchForItemUsingRequest(searchTerm);
    });

    const sortOptions = [
        "Featured",
        "Newest",
        "PercentOff",
        "PriceHighToLow",
        "PriceLowToHigh"
    ];

    it("should sort the search results correctly", async () => {
        for (let i = 0; i < sortOptions.length; i++) {
            const option = sortOptions[i];
            await searchResultsPage.sortSearchResultsByMobile(option);
            const browserUrl = await BrowserActions.getPageUrl();
            expect(browserUrl).to.contain(`keyword=${searchTerm}`);
            if (option !== "Featured") {
                expect(browserUrl).to.contain(`sort=${option}`);
            }
        }
    }
    );
});

describe(`QAREGR-T172 - Search: E-gift card - Corporate Gift Cards [${os}]`, async () => {
    const searchTerm = "gift card";
    before(async () => {
        await homepage.open();
        await homepage.performSearchMobile(searchTerm);
    });

    it("should contain appropriate URL in Learn More button", async () => {
        await BrowserActions.scrollToElement(searchResultsPage.learnMoreButton);
        if (await BrowserActions.isSiteNCOM(global.baseUrl)) {
            expect(await searchResultsPage.getURLFromLearnMoreButtonButton())
                .to.contain("c/corporate-gc-program");
        } else {
            expect(await searchResultsPage.getURLFromLearnMoreButtonButton())
                .to.contain("browse/customer-service/gift-card-info/corporate-gc-program");
        }
    });
});

describe(`QAREGR-T49 Search: Hover over other colour of the item [${os}]`, async () => {
    const isNCOM = await BrowserActions.isSiteNCOM(global.baseUrl);
    const isNCA = await BrowserActions.isSiteNCA(global.baseUrl);
    before(async () => {
        if (isNCOM || isNCA) {
            await searchResultsPage.open("browse/beauty/makeup/blush");
        } else {
            await searchResultsPage.open("c/beauty/makeup/face/blush-and-highlighter");
        }
    });

    it("I see a color carousel on products", async () => {
        if (isNCOM) {
            expect(await searchResultsPage.getColorCarouselCount()).is.greaterThanOrEqual(50);
        } else if (isNCA) {
            expect(await searchResultsPage.getColorCarouselCount()).is.greaterThanOrEqual(35);
        } else {
            expect(await searchResultsPage.getColorCarouselCount()).is.greaterThanOrEqual(10);
        }
    }
    );
    let currentImage;
    let randomIndex;
    it("I click on unselected color", async () => {
        randomIndex = await searchResultsPage.getRandomProductModuleIndex();
        currentImage = await searchResultsPage.getProductModuleImagesSrc(randomIndex);
        await searchResultsPage.clickRandomColourOnProductByIndex(randomIndex);
    }
    );
    it("Main image changes", async () => {
        expect(await searchResultsPage.getProductModuleImagesSrc(randomIndex)).not.to.be.equal(currentImage);
        currentImage = await searchResultsPage.getProductModuleImagesSrc(randomIndex);
    }
    );
    it("Mousing over a color swatch changes the product image", async () => {
        await searchResultsPage.hoverOnRandomColourOnProductByIndex(randomIndex);
        expect(await searchResultsPage.getProductModuleImagesSrc(randomIndex)).not.to.be.equal(currentImage);
    }
    );
});

describe(`QAREGR-T37 Search: Navigation [${os}]`, () => {
    before(async () => {
        await homepage.open();
        const searchTerm = await Helpers.getRandomElement(
            await Helpers.asyncReadFile("test_data/search_routes.txt"));
        await homepage.performSearchMobile(searchTerm);
    });

    it("should return more than 40 results", async () => {
        await BrowserActions.scrollToPageBottom();
        const searchResultCount = await searchResultsPage.getSearchResultCountMobile();
        expect(searchResultCount).to.be.greaterThan(40);
    });
});

describe(`QAREGR-T98 Search: Categories should be present [${os}]`, () => {
    before(async () => {
        const urlPath = await BrowserActions.isSiteRack(global.baseUrl) ?
            "shop/Women/Clothing" : "browse/women/clothing";
        const productResultsPage = new ProductResultsPage(global.baseUrl);
        await productResultsPage.open(urlPath);
    });
    const expectedCategoriesCount = 20;
    it(`I should see more than ${expectedCategoriesCount} Categories`, async () => {
        expect(await searchResultsPage.getCategoriesCount()).to.be.greaterThan(expectedCategoriesCount);
    });
});

describe(`QAREGR-T115 - Search: item color (product with more than 3 colors available) [${os}]`, async () => {
    before(async () => {
        await searchResultsPage.searchForItemUsingRequest("t-shirt");
    });

    context("When I click on Plus sign button for any item with more than 3 colors", () => {
        it("should redirect to the PDP", async () => {
            await searchResultsPage.clickOnPlusSignButton();
            await productDetailPage.checkForCoreComponents();
        });
    });
});

describe(`QAREGR-T92 - Search: GWP (Gift with Purchase) [${os}]`, async () => {
    const isNCOM = await BrowserActions.isSiteNCOM(global.baseUrl);
    if (isNCOM) { // We only run these tests on NCOM
        before(async () => {
            await searchResultsPage.searchForItemUsingRequest("gift with purchase");
        });
        context("When clicking on any GWP brand", () => {
            it("should contain at least half of search results with GWP label", async () => {
                const gwpBrandTitle = await searchResultsPage.clickOnRandomGWPBrandByIndexMobile();
                await searchResultsPage.searchForItemUsingRequest(gwpBrandTitle);
                const searchResultCount = await searchResultsPage.getSearchResultCountMobile();
                const searchResultCountForGWPItems = await searchResultsPage.getSearchResultCountGWP();
                expect(searchResultCountForGWPItems).to.be.greaterThan(searchResultCount / 2);
            });
        });
    }
});

describe(`QAREGR-T16 - Search: Predictive Search [${os}]`, async () => {
    before(async () => {
        await homepage.open();
    });

    context("When I entered the Nik in the search field", () => {
        it("suggestion Nike starts appearing below the search bar", async () => {
            const searchTerm = "nik";
            await homepage.enterPartOfSearchTermMobile(searchTerm);
            await searchResultsPage.checkForSearchSuggestionMobile();
            await searchResultsPage.clickForSearchSuggestionMobile();
        });
    });

    context("When I click on first suggested search request", () => {
        it("should return more than 20 results", async () => {
            await BrowserActions.scrollToPageBottom();
            const searchResultCount = await searchResultsPage.getSearchResultCountMobile();
            expect(searchResultCount).to.be.greaterThan(20);
        });
    });
});
