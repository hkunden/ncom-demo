/* eslint-disable no-console */
/* globals browser */
/* eslint-disable camelcase */
/* eslint-disable block-spacing */
/* eslint-disable object-curly-spacing */
require("dotenv").config();

const argv = require("minimist")(process.argv.slice(2));
const { TimelineService } = require("wdio-timeline-reporter/timeline-service");
const { BASE_URLS } = require("../constants");

const { site, suite, spec } = argv;

let siteUrl = "";
switch (site.toLowerCase()) {
    case "ncom":
        siteUrl = BASE_URLS.NORDSTROM;
        break;
    case "nca":
        siteUrl = BASE_URLS.NORDSTROM_CA;
        break;
    case "rack":
        siteUrl = BASE_URLS.RACK;
        break;
    default:
        throw Error(`Unable to load tests for site '${site}': Site name not valid`);
}

exports.config = {
    beforeSession: function () {
        global.baseUrl = siteUrl;
        global.site = site;
        global.os = (Object.values(browser.capabilities)[0].os === undefined) ?
            Object.values(browser.capabilities)[0].deviceName : Object.values(browser.capabilities)[0].os;
    },
    waitforTimeout: 30000,

    updateJob: false,
    exclude: [],

    maxInstances: 50,

    logLevel: process.env.LOGLEVEL || "silent",
    outputDir: "./logs/",
    coloredLogs: true,
    screenshotPath: "./errorShots/",
    baseUrl: "",
    connectionRetryTimeout: 90000,
    connectionRetryCount: 3,

    framework: "mocha",
    mochaOpts: {
        retries: 0,
        ui: "bdd",
        timeout: 180000,
        bail: true,
        compilers: ["js:@babel/register"]
    },
    reporters: [["timeline", { outputDir: "./reports" }]],
    services: [[TimelineService]]
};
