export class HighFiveObjectUtil {

    public static isNull(object: any): boolean {
        return object === null || object === undefined
    }

    public static isNotNull(object: any): boolean {
        return !this.isNull(object);
    }

    public static isNullOrEmpty(object: any): boolean {
        return this.isNull(object) || object === '';
    }

    public static isNumber(object: any): boolean {
        return !isNaN(object);
    }

    public static isNotNumber(object: any): boolean {
        return !this.isNumber(object);
    }
}