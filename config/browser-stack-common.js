/* eslint-disable no-console */
/* globals browser */
/* eslint-disable camelcase */
/* eslint-disable block-spacing */
/* eslint-disable object-curly-spacing */
require("dotenv").config();
import ForeseePage from "../pages/foresee-page.js";

const defaults = require("./common.js");
const chai = require("chai");
const argv = require("minimist")(process.argv.slice(2));
const _ = require("lodash");
const fetch = require("node-fetch");
const { promises: fs } = require("fs");
const { site, suite, spec } = argv;
const testName = suite === undefined ? spec.split("/").slice(2).toString().replace(".js", "") : suite;

const overrides = {
    user: process.env.BROWSERSTACK_USERNAME || "BROWSERSTACK_USERNAME",
    key: process.env.BROWSERSTACK_ACCESS_KEY || "BROWSERSTACK_ACCESS_KEY",

    commonCapabilities: {
        "bstack:options": {
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

    onPrepare: async function (config, capabilities) {
        // Recreate results folder

        const dir = `${process.cwd()}/results`;

        await fs.rmdir(dir, { recursive: true });
        await fs.mkdir(dir);

        console.log(`${dir} has been recreated!`);
    },
    before: async function (capabilities) {
        /**
         * Setup the Chai assertion framework
         */
        global.expect = chai.expect;
        global.assert = chai.assert;
        global.should = chai.should();

        // eslint-disable-next-line max-len
        browser.config.browser_os = `${capabilities.browserName}_${capabilities["bstack:options"].os}_${capabilities["bstack:options"].osVersion}.txt`;
        browser.config.browser_os = browser.config.browser_os.replace(/\s/g, "_");
        await browser.maximizeWindow();
        console.log(`${capabilities.browserName}_${capabilities["bstack:options"].os}`);

        // Disable Foresee
        const foreseePage = new ForeseePage(global.baseUrl);
        await foreseePage.open("");
        await foreseePage.checkForCoreComponents();
        await foreseePage.clickOnElement();
    },
    beforeTest: async function (test, context) {
        console.log(`Current retry: ${test._currentRetry}`);
        context.testCount = context.testCount || 0;
        context.testCount++;

        if (test._currentRetry > 0) {
            browser.deleteCookies();
            context.testCount--;
        }

        let resultFilename = `${site}_${testName}`;
        const filename = test.file.split("/").pop().replace(".js", "");
        if (!testName.includes(filename)) {
            await browser.executeScript(
                `browserstack_executor: ${JSON.stringify({
                    action: "setSessionName",
                    arguments: {
                        name: [site, testName, filename].join(" : ")
                    }
                })}`,
                []
            );

            resultFilename = `${site}_${testName}_${filename}`;
        }

        // Get browserstack link
        const auth = Buffer.from(`${this.user}:${this.key}`).toString("base64");

        const options = {
            "method": "GET",
            "headers": {
                "Authorization": `Basic ${auth}`
            }
        };

        const url = `https://api.browserstack.com/automate/sessions/${browser.sessionId}.json`;
        const response = await fetch(url, options);

        const bs_session = await response.json();

        // eslint-disable-next-line max-len
        browser.config.custom_report_filename = `${process.cwd()}/results/${resultFilename}_${context.testCount}_${browser.config.browser_os}`;
        browser.config.custom_report_filename = browser.config.custom_report_filename.replace(",", "_");

        const sessionUrl = bs_session.automation_session.public_url;

        try {
            await fs.writeFile(browser.config.custom_report_filename, sessionUrl);
        } catch (err) {
            console.error(err);
            return;
        }
    },
    afterTest: async function (testCase, context, { error, passed }) {
        // Mark the status of test on BrowserStack based on the assertion status
        let logResult;
        if (passed) {
            logResult = 0;
            await browser.executeScript(
                `browserstack_executor: ${JSON.stringify({
                    action: "setSessionStatus",
                    arguments: {
                        status: "passed",
                        reason: "Test passed"
                    }
                })}`,
                []
            );
        } else {
            logResult = 1;
            const reason = error
                .toString()
                .replace(/[^a-zA-Z0-9.]/g, " ")
                .substring(0, 255);
            await browser.executeScript(
                `browserstack_executor: ${JSON.stringify({
                    action: "setSessionStatus",
                    arguments: {
                        status: "failed",
                        reason
                    }
                })}`,
                []
            );
        }

        const data = await fs.readFile(browser.config.custom_report_filename, "utf8");
        const result = [data, logResult.toString()].join("\n");

        await fs.writeFile(browser.config.custom_report_filename, result);
    }
};

exports.config = _.defaultsDeep(overrides, defaults.config);
