var crpt = require("bcrypt");

export class HighFiveCryptService {

    public async encrypt(ax: string): Promise<string> {
        return await crpt.hash(ax, 10);
    }

    public async check(ax: string, av: string): Promise<string> {
        return await crpt.compare(ax, av);
    }
}