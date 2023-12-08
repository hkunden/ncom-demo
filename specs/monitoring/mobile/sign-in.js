/* eslint-disable no-undef */
import Homepage from "../../../pages/homepage";
import SignInPage from "../../../pages/sign-in-page";

describe(`Sign In [${os}]`, () => {
    context("Sign In", () => {
        it("should sign in the user", async () => {
            const homepage = new Homepage(global.baseUrl);
            const options = {
                skipReturnUrl: true
            };

            await homepage.open();
            await homepage.signInMobile(process.env.EMAIL, process.env.PASSWORD, options);
        });
    });
});
