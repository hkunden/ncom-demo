exports.config = {
    suites: {
        monitoring: [
            "../specs/monitoring/desktop/add-to-wishlist-authenticated.js",
            "../specs/monitoring/desktop/add-to-wishlist.js",
            "../specs/monitoring/desktop/guest-checkout.js",
            "../specs/monitoring/desktop/product-detail-page.js",
            "../specs/monitoring/desktop/product-result-page.js",
            "../specs/monitoring/desktop/sign-in.js"
        ],
        L1: [
            "../specs/monitoring/desktop/add-to-wishlist.js",
            "../specs/monitoring/desktop/product-result-page.js",
            "../specs/monitoring/desktop/product-detail-page.js"
        ],
        L2: [
            "../specs/monitoring/desktop/guest-checkout.js",
            "../specs/monitoring/desktop/sign-in.js"
        ]
    }
};
