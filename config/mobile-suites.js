exports.config = {
    suites: {
        monitoring: [
            "../specs/monitoring/mobile/add-to-wishlist-authenticated.js",
            "../specs/monitoring/mobile/add-to-wishlist.js",
            "../specs/monitoring/mobile/home-page.js",
            "../specs/monitoring/mobile/product-detail-page.js",
            "../specs/monitoring/mobile/product-results-page.js",
            "../specs/monitoring/mobile/sign-in.js"
        ],
        L1: [
            "../specs/monitoring/mobile/home-page.js",
            "../specs/monitoring/mobile/product-detail-page.js",
            "../specs/monitoring/mobile/product-results-page.js"
        ],
        L2: [
            "../specs/monitoring/mobile/sign-in.js"
        ]
    }
};
