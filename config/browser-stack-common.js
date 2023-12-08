/* eslint-disable no-console */
/* globals browser */
/* eslint-disable camelcase */
/* eslint-disable block-spacing */
/* eslint-disable object-curly-spacing */
import _ from 'lodash'
import {config} from './common.js';
import {TimelineService} from "wdio-timeline-reporter/timeline-service";
import * as chai from 'chai';
import * as dotenv from "dotenv";
import * as fs from "fs";
import Helpers from "../helpers";
import Homepage from "../pages/homepage";
import minimist from "minimist";
import BrowserActions from "../browser-actions";
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const argv = minimist(process.argv.slice(2));
const { site, suite, spec } = argv;
const testName = suite === undefined ? spec.split("/").slice(2).toString().replace(".js", "") : suite;
dotenv.config();

const overrides = {
    user: process.env.BROWSERSTACK_USERNAME || "BROWSERSTACK_USERNAME",
    key: process.env.BROWSERSTACK_ACCESS_KEY || "BROWSERSTACK_ACCESS_KEY",
    reporters: [["timeline", { outputDir: "./reports" }]],
    services: [
        [
            TimelineService
        ],
        [
            'browserstack', {
                testObservability: true,
                testObservabilityOptions: {
                    'projectName': 'Platform-WebdriverIO',
                    'buildName': process.env.BUILD || `E2E-WDIO-${process.env.USER.toUpperCase()}`,
                    'buildTag': `${process.env.SITE}`
                },
            }
        ]
    ],

    commonCapabilities: {
        "bstack:options": {
            seleniumVersion: "4.0.0",
            projectName: process.env.PROJECT || "Platform-WebdriverIO",
            buildName: process.env.BUILD || `E2E-WDIO-${process.env.USER.toUpperCase()}`,
            sessionName: `${site} : ${testName}`,
            debug: process.env.DEBUG || "false",
            video: process.env.DEBUG || "true",
            networkLogs: process.env.DEBUG || "false",
            maskCommands: "setValues, getValues, setCookies, getCookies",
            local: "false"
        }
    },

    host: "hub-cloud.browserstack.com",

    specFileRetries: 2,
    specFileRetriesDeferred: true,

    onPrepare: async function (config, capabilities) {
        // Recreate results folder

        const dir = `${process.cwd()}/results`;

        await Helpers.removedir(dir);
        await Helpers.makedir(dir);
        console.log(`${dir} has been recreated!`);

    },

    before: async function (capabilities) {
        /**
         * Setup the Chai assertion framework
         */
        global.expect = chai.expect;
        global.assert = chai.assert;
        global.should = chai.should();

        browser.config = [];
        // eslint-disable-next-line max-len
        browser.config.browser_os = `${capabilities.browserName}_${capabilities["bstack:options"].os}_${capabilities["bstack:options"].osVersion}.txt`;
        browser.config.browser_os = browser.config.browser_os.replace(/\s/g, "_");
        await browser.maximizeWindow();
        console.log(`${browser.config.browser_os.replace(/.txt/g, "")} Browserstack Session: ${browser.sessionId}`);

        // Commenting out disable forsee, since foresee page is not loading
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
        if (await BrowserActions.isDeviceAndroid()) {
            await homepage.clickCloseGetAppBanner();
        }
    },

    beforeTest: async function (test, context) {
        global.browserstackAuth = Buffer.from(`${this.user}:${this.key}`).toString("base64");
        global.browserstackSession = browser.sessionId;
        global.browserstackUrl = `https://api.browserstack.com/automate/sessions/${browser.sessionId}.json`;

        let resultFilename = `${site}_${testName}`;
        const filename = test.file.split("/").pop().replace(".js", "");
        if (!testName.includes(filename)) {
            resultFilename = `${site}_${testName}_${filename}`;
        }

        // Get browserstack link
        const getLinkOptions = {
            "method": "GET",
            "headers": {
                "Authorization": `Basic ${global.browserstackAuth}`
            }
        };
        const response = await fetch(global.browserstackUrl, getLinkOptions);

        const bs_session = await response.json();

        // eslint-disable-next-line max-len
        browser.config.custom_report_filename = `${process.cwd()}/results/${resultFilename}_${browser.config.browser_os}`;
        // browser.config.custom_report_filename = `${process.cwd()}/results/${resultFilename}_${context.testCount}_${browser.config.browser_os}`;
        browser.config.custom_report_filename = browser.config.custom_report_filename.replace(",", "_");

        const sessionUrl = bs_session.automation_session.public_url;

        try {
            await fs.writeFileSync(browser.config.custom_report_filename, sessionUrl);
        } catch (err) {
            console.error(err);
            return;
        }
    },

    afterTest: async function (test, context, { error, passed }) {
        // Mark the status of test on BrowserStack based on the assertion status
        let logResult;
        let testStatus;
        let testReason;

        if (passed) {
            logResult = 0;
            testStatus = "passed";
            testReason = "Test passed";
        } else {
            logResult = 1;
            testStatus = "failed";
            testReason = error
                .toString()
                .replace(/[^a-zA-Z0-9.]/g, " ")
                .substring(0, 255);
        }

        const response = await fetch(global.browserstackUrl, {
            method: "PUT",
            headers: {
                "Authorization": `Basic ${global.browserstackAuth}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "status": testStatus,
                "reason": testReason
            })
        });

        if (!response.ok) {
            console.log(`Failed to log Browserstack status. \n ${JSON.stringify(response)}`);
        }

        const data = await fs.readFileSync(browser.config.custom_report_filename, "utf8");
        const result = [data, logResult.toString()].join("\n");

        await fs.writeFileSync(browser.config.custom_report_filename, result);
    },

    afterSession: async function (config, capabilities, specs) {
        const filename = specs[0].split("/").pop().replace(".js", "");
        const updateSessionOptions = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Basic ${global.browserstackAuth}`
            },
            body: JSON.stringify({
                "name": [global.site, global.suite, filename].join(" : ")
            })
        };

        const updateSessoinResponse = await fetch(global.browserstackUrl, updateSessionOptions);
        if (!updateSessoinResponse.ok) {
            console.log(`Failed to update Browserstack session name. \n ${JSON.stringify(updateSessoinResponse)}`);
        }
    }
};

exports.config = _.defaultsDeep(overrides, config);
