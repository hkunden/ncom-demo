exports.config = {
    suites: {
        regression: [
            "./specs/mobile-regression-search.js",
            "./specs/mobile-regression-home-page.js",
            "./specs/mobile-browse.js",
            "./specs/mobile-home-page.js"
        ],
        monitoring: [
            "./specs/mobile-browse.js",
            "./specs/mobile-home-page.js",
            "./specs/mobile-sign-in.js"
        ],
        L1: [
            "./specs/mobile-browse.js",
            "./specs/mobile-home-page.js"
        ],
        L2: [
            "./specs/mobile-sign-in.js"
        ]
    }
};
