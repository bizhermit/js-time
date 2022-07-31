declare class Time {
    protected time: number;
    constructor(time?: number | string | Date | Time | null);
    format(pattern?: string): string;
    getTime(): number;
    getHours(): number;
    setHours(hours: number, minutes?: number, seconds?: number, milliseconds?: number): this;
    getMinutes(include?: boolean): number;
    setMinutes(minutes: number, seconds?: number, milliseconds?: number): this;
    getSeconds(include?: boolean): number;
    setSeconds(seconds: number, milliseconds?: number): this;
    getMilliseconds(include?: boolean): number;
    setMilliseconds(milliseconds: number): this;
    clear(): this;
    getCopy(): Time;
    addHours(add: number): this;
    addMinutes(add: number): this;
    addSeconds(add: number): this;
    addMilliseconds(add: number): this;
    isPlus(): boolean;
    isMinus(): boolean;
}
export declare namespace TimeUtils {
    const max: (...times: Array<Time | null | undefined>) => Time;
    const min: (...times: Array<Time | null | undefined>) => Time;
    const average: (...times: Array<Time | null | undefined>) => Time;
    const add: (time1: Time | null | undefined, time2: Time | null | undefined) => Time;
    const adds: (...times: Array<Time | null | undefined>) => Time;
    const minus: (time1: Time | null | undefined, time2: Time | null | undefined) => Time;
    const validContext: (before: Time | null | undefined, after: Time | null | undefined) => boolean;
    const convertMillisecondsToUnit: (milliseconds: number | null | undefined, returnUnit: "hour" | "minute" | "second" | "millisecond", mode?: "floor" | "ceil" | "round") => number | undefined;
    const convertUnitToMilliseconds: (value: number | null | undefined, argUnit: "hour" | "minute" | "second" | "millisecond") => number | undefined;
    const format: (millisecond: number, pattern?: string) => string;
}
export default Time;
