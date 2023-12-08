/* eslint-disable no-undef */
import Homepage from "../../../pages/homepage";

describe(`Sign In  [${os}]`, () => {
    context("Sign In", () => {
        it("should successfully sign the user", async () => {
            const homepage = new Homepage(global.baseUrl);
            const options = {
                skipReturnUrl: true
            };

            await homepage.open();
            await homepage.signIn(process.env.EMAIL, process.env.PASSWORD, options);
        });
    });
});
