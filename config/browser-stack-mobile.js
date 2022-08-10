/* eslint-disable no-console */
/* globals browser */
/* eslint-disable camelcase */

require("dotenv").config();

const defaults = require("./browser-stack-common.js");
const testSuites = require("./mobile-suites.js");
const _ = require("lodash");

let overrides = {
    capabilities: [
        {
            "bstack:options": {
                "deviceName": "iPhone 12 Pro",
                "osVersion": "14",
                "realMobile": "true"
            },
            "browserName": "iPhone"
        },
        {
            "bstack:options": {
                "deviceName": "Samsung Galaxy S22",
                "osVersion": "12",
                "realMobile": "true"
            },
            "browserName": "Android"
        }
    ]
};

// Code to support common capabilities
overrides.capabilities.forEach(function (caps) {
    _.merge(caps, defaults.config.commonCapabilities);
});

overrides = _.defaultsDeep(overrides, testSuites.config);

exports.config = _.defaultsDeep(overrides, defaults.config);
