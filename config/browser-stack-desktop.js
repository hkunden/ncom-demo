/* eslint-disable no-console */
/* globals browser */
/* eslint-disable camelcase */
/* eslint-disable block-spacing */
/* eslint-disable object-curly-spacing */
require("dotenv").config();

const defaults = require("./browser-stack-common.js");
const testSuites = require("./desktop-suites.js");
const _ = require("lodash");

let overrides = {
    capabilities: [
        {
            "bstack:options": {
                "os": "Windows",
                "osVersion": "10"
            },
            "browserName": "Chrome",
            "browserVersion": "latest-2"
        },
        {
            "bstack:options": {
                "os": "OS X",
                "osVersion": "Big Sur"
            },
            "browserName": "Chrome",
            "browserVersion": "latest-2"
        },
        {
            "bstack:options": {
                "os": "OS X",
                "osVersion": "Big Sur"
            },
            "browserName": "Firefox",
            "browserVersion": "latest-2"
        },
        {
            "bstack:options": {
                "os": "Windows",
                "osVersion": "10"
            },
            "browserName": "Firefox",
            "browserVersion": "latest-2"
        },
        // {
        //     "browserName": "IE",
        //     browser_version: "11.0",
        //     "os": "Windows",
        //     os_version: "10"
        // },
        {
            "bstack:options": {
                "os": "OS X",
                "osVersion": "Big Sur"
            },
            "browserName": "Safari",
            "browserVersion": "14.0"
        },
        {
            "bstack:options": {
                "os": "Windows",
                "osVersion": "10"
            },
            "browserName": "Edge",
            "browserVersion": "latest-2"
        }
    ]
};

// Code to support common capabilities
overrides.capabilities.forEach(function (caps) {
    _.merge(caps, defaults.config.commonCapabilities);
});

overrides = _.defaultsDeep(overrides, testSuites.config);

exports.config = _.defaultsDeep(overrides, defaults.config);
