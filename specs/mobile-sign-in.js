/* eslint-disable no-undef */
import SignInPage from "../pages/sign-in-page";

describe(`Verify Sign In page on mobile. [${os}]`, () => {
    it("should load sign in page", async () => {
        const signInPage = new SignInPage(global.baseUrl);

        await signInPage.open();

        await signInPage.checkForCoreComponents();
    });
});
