import _ from 'lodash'
import * as chai from 'chai';
import * as defaults from "./common.js";
import Homepage from "../pages/homepage";

import ForeseePage from "../pages/foresee-page.js";

const overrides = {
    capabilities: [{
        maxInstances: 5,
        browserName: "chrome",
        acceptInsecureCerts: true
    }],
    services: [
        ["chromedriver", {
            logFileName: 'wdio-chromedriver.log', // default
            outputDir: 'driver-logs', // overwrites the config.outputDir
            args: ['--silent']
        }]
      ],
    before: async function () {
        /**
         * Setup the Chai assertion framework
         */
        global.expect = chai.expect;
        global.assert = chai.assert;
        global.should = chai.should();

        await browser.maximizeWindow()

        // try {
        //     // Disable Foresee
        //     const foreseePage = new ForeseePage(global.baseUrl);
        //     await foreseePage.open("");
        //     await foreseePage.checkForCoreComponents();
        //     await foreseePage.clickOnElement();
        // } catch (err) {
        // }

        // Set default experiments
        const homepage = new Homepage(global.baseUrl);
        await homepage.setDefaultExperiments();
    }
};

exports.config = _.defaultsDeep(overrides, defaults.config);
