class Time {

  protected time: number;

  constructor(time?: number | string | Date | Time | null) {
    this.time = 0;
    if (time == null) return this;
    if (typeof time === "number") {
      this.time = time;
      return this;
    }
    if (typeof time === "string") {
      let ctx = time.match(/^(\d{2}|$)(\d{2}|$)(\d{2}|$)(\d{3}|$)/);
      if (!ctx) ctx = time.match(/^(\d+)?(?::|時|$)(\d+)?(?::|分|$)(\d+)?(?:.|秒|$)(\d+)?(?:.*|$)/);
      if (ctx) this.time = Number(ctx[1] ?? "0") * 3600000 + Number(ctx[2] ?? "0") * 60000 + Number(ctx[3] ?? "0") * 1000 + Number(ctx[4] ?? "0");
      return this;
    }
    if (typeof (time as any).time === "number") {
      this.time = (time as Time).time;
      return this;
    }
    this.time = ((time as Date).getTime() - (time as Date).getTimezoneOffset() * 60000) % 86400000;
    return this;
  }

  public format(pattern = "hh:mm:ss.SSS") {
    return pattern
      .replace("hh", `0${this.getHours()}`.slice(-2))
      .replace("h", String(this.getHours()))
      .replace("mm", `0${this.getMinutes()}`.slice(-2))
      .replace("m", String(this.getMinutes()))
      .replace("ss", `0${this.getSeconds()}`.slice(-2))
      .replace("s", String(this.getSeconds()))
      .replace("SSS", `00${this.getMilliseconds()}`.slice(-3))
      .replace("SS", `00${this.getMilliseconds()}`.slice(-3).slice(2))
      .replace("S", String(this.getMilliseconds()));
  }

  public getTime() {
    return this.time;
  }

  public getHours() {
    return Math.floor(this.time / 3600000);
  }

  public setHours(hours: number, minutes?: number, seconds?: number, milliseconds?: number) {
    this.time = Math.max(0, hours * 3600000 + (minutes ?? this.getMinutes()) * 60000 + (seconds ?? this.getSeconds()) * 1000 + (milliseconds ?? this.getMilliseconds()));
    return this;
  }

  public getMinutes(include?: boolean) {
    if (include) return Math.floor(this.time / 60000);
    return Math.floor(this.time / 60000) % 60;
  }

  public setMinutes(minutes: number, seconds?: number, milliseconds?: number) {
    this.time = Math.max(0, this.getHours() * 3600000 + minutes * 60000 + (seconds ?? this.getSeconds()) * 1000 + (milliseconds ?? this.getMilliseconds()));
    return this;
  }

  public getSeconds(include?: boolean) {
    if (include) return Math.floor(this.time / 1000);
    return Math.floor(this.time / 1000) % 60;
  }

  public setSeconds(seconds: number, milliseconds?: number) {
    this.time = Math.max(0, this.getMinutes(true) * 60000 + seconds * 1000 + (milliseconds ?? this.getMilliseconds()));
    return this;
  }

  public getMilliseconds(include?: boolean) {
    if (include) return this.time;
    return this.time % 1000;
  }

  public setMilliseconds(milliseconds: number) {
    this.time = this.getSeconds(true) * 1000 + Math.max(0, milliseconds);
    return this;
  }

  public clear() {
    this.time = 0;
    return this;
  }

  public getCopy() {
    return new Time(this);
  }

  public addHours(add: number) {
    this.time = Math.max(0, this.time + add * 3600000);
    return this;
  }

  public addMinutes(add: number) {
    this.time = Math.max(0, this.time + add * 60000);
    return this;
  }

  public addSeconds(add: number) {
    this.time = Math.max(0, this.time + add * 1000);
    return this;
  }

  public addMilliseconds(add: number) {
    this.time = this.time + add;
    return this;
  }

};

export default Time;

export const TimeUtils = {
  max: (...times: Array<Time | null | undefined>) => {
    let max = 0;
    times.forEach(time => {
      if (time == null) return;
      max = Math.max(max, time.getTime());
    });
    return new Time(max);
  },
  min: (...times: Array<Time | null | undefined>) => {
    let min: number | undefined = undefined;
    times.forEach(time => {
      if (time == null) return;
      if (min == null) {
        min = time.getTime();
        return;
      }
      min = Math.min(min, time.getTime());
    });
    return new Time(min);
  },
  average: (...times: Array<Time | null | undefined>) => {
    const time = TimeUtils.adds(...times);
    return new Time(Math.round(time.getTime() / Math.max(1, times.length)));
  },
  add: (time1: Time | null | undefined, time2: Time | null | undefined) => {
    if (time1 == null) return new Time(time2);
    if (time2 == null) return new Time(time1);
    return new Time(time1.getTime() + time2.getTime());
  },
  adds: (...times: Array<Time | null |undefined>) => {
    let t = 0;
    times.forEach(time => {
        if (time == null) return;
        t += time.getTime();
    });
    return new Time(t);
  },
  validContext: (before: Time | null | undefined, after: Time | null | undefined) => {
    if (before == null || after == null) return true;
    return after.getTime() - before.getTime() >= 0;
  },
  convertMillisecondsToUnit: (milliseconds: number | null | undefined, returnUnit: "hour" | "minute" | "second" | "millisecond", mode: "floor" | "ceil" | "round" = "round") => {
    if (milliseconds == null) return undefined;
    const impl = (denom: number) => {
      if (mode === "ceil") return Math.ceil(milliseconds / denom);
      if (mode === "floor") return Math.floor(milliseconds / denom);
      return Math.round(milliseconds /denom);
    }
    if (returnUnit === "hour") return impl(3600000);
    if (returnUnit === "minute") return impl(60000);
    if (returnUnit === "second") return impl(1000);
    return milliseconds;
  },
  convertUnitToMilliseconds: (value: number | null | undefined, argUnit: "hour" | "minute" | "second" | "millisecond") => {
    if (value == null) return undefined;
    if (argUnit === "hour") return value * 3600000;
    if (argUnit === "minute") return value * 60000;
    if (argUnit === "second") return value * 1000;
    return value;
  },
};