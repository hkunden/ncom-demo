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
        rand = Math.floor( rand * difference);
        rand = rand + min;
        return rand;
    }

    static async trimAllNonNumericCharacters(string) {
        const regex = /\D/gi;
        return string.replace(regex, "");
    }

    static async trimDistanceFromStoresList(s) {
        return parseFloat(await s.split(s.split(/\d/)[0])[1].split(" ")[0]);
    }
}
