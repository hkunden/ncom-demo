/* eslint-disable no-console */
/* globals browser */
/* eslint-disable camelcase */
import * as dotenv from "dotenv";
import * as defaults from "./browser-stack-common.js";
import * as testSuites from "./mobile-suites.js";
import _ from 'lodash'
dotenv.config();

// Latest-1
let overrides = {
    capabilities: [
        {
            "bstack:options": {
                "deviceName": "iPhone 13 Pro",
                "osVersion": "15",
                "os": "ios"
            },
            "browserName": "safari"
        },
        {
            'bstack:options': {
              "deviceName": "Samsung Galaxy S22 Ultra",
              "osVersion": "12.0",
              "os": "android"
            },
            "browserName": "samsung"
        },
        {
            "bstack:options": {
              "deviceName": "Google Pixel 6 Pro",
              "osVersion": "13.0",
              "os": "android"
            },
            "browserName": "chrome",
        }
    ]
};

// Code to support common capabilities
overrides.capabilities.forEach(function (caps) {
    _.merge(caps, defaults.config.commonCapabilities);
});

overrides = _.defaultsDeep(overrides, testSuites.config);

exports.config = _.defaultsDeep(overrides, defaults.config);
