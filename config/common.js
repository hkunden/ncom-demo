/* eslint-disable no-console */
/* globals browser */
/* eslint-disable camelcase */
/* eslint-disable block-spacing */
/* eslint-disable object-curly-spacing */
import * as dotenv from "dotenv"
import minimist from "minimist";
import { BASE_URLS } from "../constants"
const argv = minimist(process.argv.slice(2));
dotenv.config();

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
        global.suite = suite;
        global.os = (Object.values(browser.capabilities)[0].os === undefined) ?
            Object.values(browser.capabilities)[0].deviceName : Object.values(browser.capabilities)[0].os;
    },
    waitforTimeout: 30000,
    waitforInterval: 500,

    updateJob: false,
    exclude: [],

    maxInstances: 50,

    logLevel: process.env.LOGLEVEL || "silent",
    coloredLogs: true,
    screenshotPath: "./errorShots/",
    baseUrl: "",
    connectionRetryTimeout: 90000,
    connectionRetryCount: 3,

    framework: "mocha",
    mochaOpts: {
        ui: "bdd",
        timeout: 540000,
        bail: false,
        compilers: ["js:@babel/register"]
    }
};
