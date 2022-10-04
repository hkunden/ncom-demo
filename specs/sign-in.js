import Homepage from "../pages/homepage";

describe("Signing In", () => {
    it("should successfully sign the user in", async () => {
        const homepage = new Homepage(global.baseUrl);
        const options = {
            skipReturnUrl: true
        };

        await homepage.open();
        await homepage.signIn(process.env.EMAIL, process.env.PASSWORD, options);
    });
});
