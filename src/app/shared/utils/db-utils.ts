export class DbUtils {

    public static dateToEpoch(date: Date | undefined): number | undefined {
        if (date) {
            return date.getTime() / 1000;
        }
        return undefined;
    }

    public static epochToDate(epoch: number | undefined): Date | undefined {
        if (epoch) {
            return new Date(epoch * 1000);
        }
        return undefined;
    }

    public static numberToString(value: number | undefined): string | undefined {
        if (value) {
            return value.toString();
        }
        return undefined;
    }

    public static stringToNumber(value: string | undefined): number | undefined {
        if (value) {
            return +value;
        }
        return undefined;
    }

}
