var crpt = require("bcrypt");

export class HighFiveCryptUtil {

    public static async encrypt(ax: string): Promise<string> {
        return await crpt.hash(ax, 10);
    }

    public static async check(ax: string, av: string): Promise<string> {
        return await crpt.compare(ax, av);
    }
}