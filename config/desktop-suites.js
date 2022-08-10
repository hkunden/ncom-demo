exports.config = {
    suites: {
        regression: [
            "./specs/regression.js"
        ],
        monitoring: [
            "./specs/add-to-wishlist.js",
            "./specs/browse.js",
            "./specs/guest-checkout.js",
            "./specs/product-detail-page.js",
            "./specs/sign-in.js"
        ],
        L1: [
            "./specs/add-to-wishlist.js",
            "./specs/browse.js",
            "./specs/product-detail-page.js"
        ],
        L2: [
            "./specs/guest-checkout.js",
            "./specs/sign-in.js"
        ]
    }
};
