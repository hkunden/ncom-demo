exports.config = {
    suites: {
        regression: [
            "./specs/regression-search.js",
            "./specs/regression-home-page.js",
            "./specs/browse.js",
            "./specs/add-to-wishlist.js"
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
