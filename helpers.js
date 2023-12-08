// eslint-disable-next-line no-undef
import _ from "lodash";
import { mkdir } from 'node:fs/promises';
import { rm } from 'node:fs/promises';
import fs from "fs";

const {promises: fsPromises} = require("fs");

export default class Helpers {
    static async asyncReadFile(filename) {
        const contents = await fsPromises.readFile(filename, "utf-8");
        return contents.split(/\r?\n/);
    }

    static async getRandomElement(list) {
        return list[Math.floor((Math.random() * list.length))];
    }

    static async getRandomNumber(min, max) {
        const difference = max - min;
        let rand = Math.random();
        rand = Math.floor(rand * difference);
        rand = rand + min;
        return rand;
    }

    static async trimAllNonNumericCharacters(string) {
        const regex = /\D/gi;
        return string.replace(regex, "");
    }

    static async trimAllNonNumericCharactersAsFloat(string) {
        return parseFloat(await this.trimAllNonNumericCharacters(string));
    }

    static async trimDistanceFromStoresList(s) {
        return parseFloat(await s.split(s.split(/\d/)[0])[1].split(" ")[0]);
    }

    static async trimReviewStar(string) {
        const star = await this.trimAllNonNumericCharacters(string);
        return parseFloat(star);
    }

    static async parseReviewDate(date) {
        return Date.parse(date);
    }

    static async parseThreshold(line) {
        return line.split(",");
    }

    static async trimPrice(price) {
        return parseFloat(price.replace("$", ""));
    }

    static async trimByNewline(text) {
        return text.split("\n")[0];
    }

    static async trimBySpace(text) {
        return text.split(" ")[0];
    }

    static async removedir(dir) {
        try {
            await rm(dir, { recursive: true });
          } catch (err) {
            console.error(err.message);
          }

    }

    static async makedir(dir) {
        try {
            await mkdir(dir, { recursive: true });
          } catch (err) {
            console.error(err.message);
          }
    }

    static async trimProductName(string) {
        const regex = /( \(\w+\))/;
        return string.replace(regex, "");
    }

    static async getAnniversaryDates(dateKey) {
        const dates = JSON.parse(await fsPromises.readFile("test_data/anniversary_dates.json", "utf8"));
        return dates[dateKey];
    }

    static async getAnniversaryUsersByLoyalty(loyaltyLevel, cardInWallet, cardMember) {
        const usersJson = fs.readFileSync("test_data/anniversary_users.json", "utf8");
        const obj = JSON.parse(usersJson);
        return _.filter(obj, {"loyaltyLevel": loyaltyLevel, "cardInWallet": cardInWallet, "cardMember": cardMember});
    }

    static async getAnniversaryUsers(cardInWallet, cardMember) {
        const usersJson = fs.readFileSync("test_data/anniversary_users.json", "utf8");
        const obj = JSON.parse(usersJson);
        return _.filter(obj, {"cardInWallet": cardInWallet, "cardMember": cardMember});
    }

    static async getWLUserByPlatformAndBrowser(scenario) {
        const usersJson = fs.readFileSync("test_data/wl_users.json", "utf8");
        const obj = JSON.parse(usersJson);
        return _.filter(obj, {
            "platform": await this.trimBySpace(browser.capabilities.platformName),
            "browser": browser.capabilities.browserName, "scenario": scenario
        })[0];
    }

    static async getWLUserByPlatform(scenario) {
        const usersJson = fs.readFileSync("test_data/wl_users.json", "utf8");
        const obj = JSON.parse(usersJson);
        const text = browser.capabilities.platformName;
        console.log(text);
        return _.filter(obj, {
            "platform": await this.trimBySpace(text), "scenario": scenario
        })[0];
    }

    static async setPerfOrderCookie() {
        const cookies = [
            {
                name: "checkoutoptions",
                value: "perforder=true&skipservice=esb&skipservice=ordernumber&skipservice" +
                    "=payment&skipservice=paymenttoken&skipservice=paymentauth"
            }
        ];
        cookies.push({
            name: "Nord-Test",
            value: "Load"
        });
        await browser.setCookies(cookies);
    }

    static async trimLastCharacterInString(string) {
        return string.substring(0, string.length - 1);
    }
}
