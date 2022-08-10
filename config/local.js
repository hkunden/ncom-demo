const defaults = require("./common.js");
const _ = require("lodash");
const chai = require("chai");

import ForeseePage from "../pages/foresee-page.js";

const overrides = {
    capabilities: [{
        maxInstances: 5,
        browserName: "chrome",
        acceptInsecureCerts: true
    }],
    services: ["chromedriver"],
    before: async function () {
        /**
         * Setup the Chai assertion framework
         */
        global.expect = chai.expect;
        global.assert = chai.assert;
        global.should = chai.should();

        // Disable Foresee
        const foreseePage = new ForeseePage(global.baseUrl);
        await foreseePage.open("");
        await foreseePage.checkForCoreComponents();
        await foreseePage.clickOnElement();
    }
};

exports.config = _.defaultsDeep(overrides, defaults.config);
